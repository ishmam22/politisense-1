/* eslint-env jest */
import { BroadDataGetter } from '../BroadDataGetter'

describe('BroadDataGetter.test', () => {
  it('should return some data', (done) => {
    const minutes = 60000
    jest.setTimeout(5 * minutes)

    const dataGetter = new BroadDataGetter()
    dataGetter.getGovernmentData(4).then(data => {
      expect(typeof data).toBe('object')
      console.log(JSON.stringify(data))
      done()
    })
  })
})
