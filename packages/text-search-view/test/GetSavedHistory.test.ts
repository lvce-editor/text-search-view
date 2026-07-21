import { expect, test } from '@jest/globals'
import { getSavedHistory } from '../src/parts/GetSavedHistory/GetSavedHistory.ts'

test('getSavedHistory returns history when it exists and all entries are strings', () => {
  const history = ['one', 'two']
  const savedState = { history }
  const result = getSavedHistory(savedState)
  expect(result).toBe(history)
})

test('getSavedHistory returns empty array when history contains non-string values', () => {
  const savedState = { history: ['one', 2] }
  const result = getSavedHistory(savedState)
  expect(result).toEqual([])
})

test('getSavedHistory returns empty array when history is missing', () => {
  const savedState = { other: 'value' }
  const result = getSavedHistory(savedState)
  expect(result).toEqual([])
})
