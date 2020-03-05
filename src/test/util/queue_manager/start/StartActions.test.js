/* eslint-env jest */
const Start = require('../../../../util/queue_manager/start/starts')
const Generic = require('../../../../util/queue_manager/start/GenericStartAction').GenericStartAction
const Queue = require('../../../../util/queue/queues').Queue
const Jobs = require('../../../../job/jobs')
const ActionDecorationError = require('../../../../util/action/error/ActionDecorationError').ActionDecorationError
const chai = require('chai')
const Assert = chai.assert

describe('QueueManager Start Actions', () => {
  let manager
  beforeEach(() => {
    let num = 0
    manager = {
      params: new Array(10)
        .fill({}, 0, 10)
        .map(i => {
          return {
            url: 'https://www.google.ca',
            params: {
              id: `${num++}`
            }
          }
        }),
      queue: new Queue(),
      requeueCallback: () => {}
    }
  })

  test('GenericStartAction.js can be created with any Job Type', async (done) => {
    Object.values(Jobs).forEach(type => {
      // eslint-disable-next-line no-new
      new Generic(manager, type)
    })

    done()
  }, 60000)

  test('GenericStartAction.js throws on bad Type', async (done) => {
    try {
      // eslint-disable-next-line no-new
      new Generic(manager, {})
      Assert.fail()
    } catch (e) {
      if (e instanceof chai.AssertionError) {
        throw e
      }
      Assert(e instanceof ActionDecorationError)
    }
    done()
  })

  test('GenericStartAction.js::perform adds query parameters to manager queue', async (done) => {
    const test = new Generic(manager, Jobs.RoleFetchJob)
    await test.perform()
    Assert.equal(manager.queue.size(), 10)
    done()
  })

  test('StartAction Specialisations do not throw', async (done) => {
    // eslint-disable-next-line no-new
    new Start.StartVoteParticipantScrape({})
    // eslint-disable-next-line no-new
    new Start.StartVoteRecordScrape({})
    // eslint-disable-next-line no-new
    new Start.StartRoleScrape({})
    // eslint-disable-next-line no-new
    new Start.StartPoliticianScrape({})
    // eslint-disable-next-line no-new
    new Start.Classify({})
    // eslint-disable-next-line no-new
    new Start.BillLink({})
    // eslint-disable-next-line no-new
    new Start.BillPDF({})
    // eslint-disable-next-line no-new
    new Start.Bill({})
    done()
  })
})
