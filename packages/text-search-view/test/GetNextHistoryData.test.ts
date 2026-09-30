import { test, expect } from '@jest/globals'
import { getNextHistoryData } from '../src/parts/GetNextHistoryData/GetNextHistoryData.ts'

test('getNextHistoryData leaves an empty history at the blank input', () => {
  expect(getNextHistoryData([], -1)).toEqual({ newHistoryIndex: -1, newValue: '' })
})

test('getNextHistoryData leaves the blank input unchanged', () => {
  expect(getNextHistoryData(['first', 'second'], -1)).toEqual({ newHistoryIndex: -1, newValue: '' })
})

test('getNextHistoryData moves toward newer history entries', () => {
  expect(getNextHistoryData(['first', 'second', 'third'], 0)).toEqual({ newHistoryIndex: 1, newValue: 'second' })
})

test('getNextHistoryData returns to the blank input after the newest entry', () => {
  expect(getNextHistoryData(['first', 'second'], 1)).toEqual({ newHistoryIndex: -1, newValue: '' })
})
