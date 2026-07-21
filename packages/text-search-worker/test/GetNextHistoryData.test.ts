import { test, expect } from '@jest/globals'
import { getNextHistoryData } from '../src/parts/GetNextHistoryData/GetNextHistoryData.ts'

test('getNextHistoryData with empty history', () => {
  const result = getNextHistoryData([], 0)
  expect(result).toEqual({
    newHistoryIndex: -1,
    newValue: '',
  })
})

test('getNextHistoryData with historyIndex -1', () => {
  const result = getNextHistoryData(['test1', 'test2'], -1)
  expect(result).toEqual({
    newHistoryIndex: -1,
    newValue: '',
  })
})

test('getNextHistoryData with valid history and index', () => {
  const history = ['test1', 'test2', 'test3']
  const result = getNextHistoryData(history, 1)
  expect(result).toEqual({
    newHistoryIndex: 2,
    newValue: 'test2',
  })
})

test('getNextHistoryData with index at end of history', () => {
  const history = ['test1', 'test2']
  const result = getNextHistoryData(history, 1)
  expect(result).toEqual({
    newHistoryIndex: 2,
    newValue: 'test2',
  })
})

test('getNextHistoryData with index beyond history length', () => {
  const history = ['test1', 'test2']
  const result = getNextHistoryData(history, 5)
  expect(result).toEqual({
    newHistoryIndex: 6,
    newValue: '',
  })
})

test('getNextHistoryData with index 0', () => {
  const history = ['test1', 'test2', 'test3']
  const result = getNextHistoryData(history, 0)
  expect(result).toEqual({
    newHistoryIndex: 1,
    newValue: 'test1',
  })
})
