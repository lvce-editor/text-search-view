import { test, expect } from '@jest/globals'
import { getPreviousHistoryData } from '../src/parts/GetPreviousHistoryData/GetPreviousHistoryData.ts'

test('getPreviousHistoryData leaves an empty history blank', () => {
  expect(getPreviousHistoryData([], -1)).toEqual({ newHistoryIndex: -1, newValue: '' })
})

test('getPreviousHistoryData recalls the newest entry from the blank input', () => {
  expect(getPreviousHistoryData(['first', 'second'], -1)).toEqual({ newHistoryIndex: 1, newValue: 'second' })
})

test('getPreviousHistoryData moves toward older entries', () => {
  expect(getPreviousHistoryData(['first', 'second', 'third'], 2)).toEqual({ newHistoryIndex: 1, newValue: 'second' })
})

test('getPreviousHistoryData remains at the oldest entry', () => {
  expect(getPreviousHistoryData(['first', 'second'], 0)).toEqual({ newHistoryIndex: 0, newValue: 'first' })
})
