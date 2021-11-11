import assert from 'node:assert'
import { addDays } from '../../modules/_addDays.js'
import { describe, it } from 'mocha'

describe('_addDays', () => {
  it('add n days OK', () => {
    const date = new Date('2021-11-11T23:00:00.000Z')
    const expectedDate = new Date('2021-11-14T23:00:00.000Z')
    const days = addDays(date, 3)
    console.log(date)
    console.log(days)
    console.log(expectedDate)
    assert(days.getTime() === expectedDate.getTime())
  })
})
