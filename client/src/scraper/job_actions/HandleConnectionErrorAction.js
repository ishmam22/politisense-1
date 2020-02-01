const Action = require('./JobAction').AbstractJobAction
const ScrapeError = require('./LinkScraperAction').ScrapeError

class HandleConnectionErrorAction extends Action {
  constructor (callback, creationFn, topLevelDomains) {
    super()
    this.callback = callback
    this.create = creationFn
    this.tlds = topLevelDomains
  }

  async perform(e) {
    let error = this.throwOnUnexpected(e)
    if(error) {
      return error
    }
    error = this.throwOnMalformedLink(e)
    if(!error) {
      return error
    }
    error = this.requeueOnFailedConnection(e)
    if(!error) {
      return error
    }
    error = this.reconditionPartialLinks(e)
    if(!error) {
      return error
    }
  }

  throwOnUnexpected (e) {
    if (!(e instanceof ScrapeError)) {
      console.debug(e)
      return e
    }
    return null
  }

  requeueOnFailedConnection (e) {
    const connectionError = HandleConnectionErrorAction.connectionErrorName(e.message)
    if (connectionError) {
      const message = 'ERROR: Connection failure ' + connectionError + ', requeuing job: ' + e.link
      const error = new ScrapeError(message, e.link)
      this.callback([
        this.create(e.link, this.callback, this.tlds)
      ])
      console.debug(error.message)
      return error
    }
    return e
  }

  throwOnMalformedLink (e) {
    if (e.link.includes('https://')) {
      const message = 'ERROR: Malformed link passed to scraper: ' + e.link
      const error = new ScrapeError(message, e.link)
      console.debug(error.message)
      return error
    }
    return e
  }

  reconditionPartialLinks (e) {
    let message = null
    let link = null
    if (e.link.startsWith('//')) {
      e.link = 'https:' + e.link
      this.callback([
        this.create(e.link, this.callback, this.tlds)
      ])
      message = 'Re-enqueuing link as: ' + e.link
      link = e.link
    } else if (e.link.startsWith('/')) {
      this.tlds.forEach(tld => {
        const newLink = tld + e.link
        this.callback([
          this.create(newLink, this.callback, this.tlds)
        ])
      })
      message = 'Re-enqueuing link from specified TLDs: ' + e.link
      link = e.link
    }
    if(message && link) {
      return new ScrapeError(message, link)
    } else {
      return e
    }
  }

  static connectionErrorName (message) {
    if (!message) {
      return null
    }
    if (message.includes('ESOCKETTIMEDOUT')) {
      return 'ESOCKETTIMEDOUT'
    }
    if (message.includes('ETIMEDOUT')) {
      return 'ETIMEDOUT'
    }
    if (message.includes('ECONNRESET')) {
      return 'ECONNRESET'
    }
    if (message.includes('EPIPE')) {
      return 'EPIPE'
    }
    if (message.includes('ENOTFOUND')) {
      return 'ENOTFOUND'
    }
    return null
  }
}

module.exports.HandleConnectionErrorAction = HandleConnectionErrorAction