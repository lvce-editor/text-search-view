import { expect, test } from '@jest/globals'
import * as GetNewHistory from '../src/parts/GetNewHistory/GetNewHistory.ts'

test('appends the new value', () => {
  expect(GetNewHistory.getNewHistory(['first'], 'second')).toEqual(['first', 'second'])
})

test('limits the history to 100 entries', () => {
  const history = Array.from({ length: 100 }, (_, index) => `${index}`)
  expect(GetNewHistory.getNewHistory(history, 'new value')).toEqual(history)
})
