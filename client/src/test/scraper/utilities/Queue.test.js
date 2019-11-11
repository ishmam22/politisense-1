import { Queue } from '../../../scraper/utilities/Queue'
import { ScrapeJob } from '../../../scraper/ScrapeJob'
const assert = require('chai').assert
const expect = require('chai').expect

// eslint-disable-next-line no-undef
describe('All Job Queue tests', () => {
  // eslint-disable-next-line no-undef
  test('Can enqueue a Job', () => {
    const q = new Queue()
    q.enqueue(new ScrapeJob())
    assert.equal(q.size(), 1, 'There should only be one Job in the queue')
  })
  // eslint-disable-next-line no-undef
  test('Can dequeue a Job', () => {
    const q = new Queue()
    q.enqueue(new ScrapeJob())
    q.enqueue(new ScrapeJob('a'))
    q.dequeue()
    assert.equal(q.size(), 1, 'There should only be one Job in the queue')
  })
  // eslint-disable-next-line no-undef
  test('Cannot enqueue same job twice', () => {
    const q = new Queue()
    q.enqueue(new ScrapeJob())
    const testFn = () => {
      q.enqueue(new ScrapeJob())
    }
    expect(testFn).to.throw()
  })
  // eslint-disable-next-line no-undef
  test('Dequeue on empty list throws', () => {
    const q = new Queue()
    assert.equal(q.size(), 0, 'empty queue')
    const testFn = () => {
      q.dequeue()
    }
    expect(testFn).to.throw()
  })
})