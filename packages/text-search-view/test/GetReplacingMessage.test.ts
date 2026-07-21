import { expect, test } from '@jest/globals'
import * as GetReplacingMessage from '../src/parts/GetReplacingMessage/GetReplacingMessage.ts'

test('getReplacingMessage - single occurrence in one file', () => {
  expect(GetReplacingMessage.getReplacingMessage(1, 1)).toBe('Replacing 1 occurrence across 1 file…')
})

test('getReplacingMessage - multiple occurrences in one file', () => {
  expect(GetReplacingMessage.getReplacingMessage(1, 3)).toBe('Replacing 3 occurrences across 1 file…')
})

test('getReplacingMessage - multiple occurrences across multiple files', () => {
  expect(GetReplacingMessage.getReplacingMessage(3, 5)).toBe('Replacing 5 occurrences across 3 files…')
})
