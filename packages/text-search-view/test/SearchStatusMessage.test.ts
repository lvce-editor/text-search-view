import { expect, test } from '@jest/globals'
import * as SearchStatusMessage from '../src/parts/SearchStatusMessage/SearchStatusMessage.ts'

test('getStatusMessage - no results', () => {
  expect(SearchStatusMessage.getStatusMessage(0, 0)).toBe('No results found')
})

test('getStatusMessage - one result', () => {
  expect(SearchStatusMessage.getStatusMessage(1, 1)).toBe('1 result in 1 file')
})

test('getStatusMessage - multiple results in one file', () => {
  expect(SearchStatusMessage.getStatusMessage(3, 1)).toBe('3 results in 1 file')
})

test('getStatusMessage - multiple results in multiple files', () => {
  expect(SearchStatusMessage.getStatusMessage(5, 3)).toBe('5 results in 3 files')
})
