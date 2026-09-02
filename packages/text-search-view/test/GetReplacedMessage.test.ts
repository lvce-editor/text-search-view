import { expect, test } from '@jest/globals'
import * as GetReplacedMessage from '../src/parts/GetReplacedMessage/GetReplacedMessage.ts'
import * as SearchStrings from '../src/parts/SearchStrings/SearchStrings.ts'

test('getReplacedMessage - single occurrence in one file', () => {
  const message = GetReplacedMessage.getReplacedMessage(1, 1, 'newText')
  expect(message).toBe(SearchStrings.replacedOneOccurrenceInOneFile('newText'))
})

test('getReplacedMessage - multiple occurrences in one file', () => {
  const message = GetReplacedMessage.getReplacedMessage(1, 3, 'newText')
  expect(message).toBe(SearchStrings.replacedManyOccurrencesInOneFile(3, 'newText'))
})

test('getReplacedMessage - multiple occurrences across multiple files', () => {
  const message = GetReplacedMessage.getReplacedMessage(3, 5, 'newText')
  expect(message).toBe(SearchStrings.replacedManyOccurrencesInManyFiles(5, 3, 'newText'))
})

test('getReplacedMessage - single occurrence with empty replacement', () => {
  const message = GetReplacedMessage.getReplacedMessage(1, 1, '')
  expect(message).toBe('Replaced 1 occurrence across 1 file')
})

test('getReplacedMessage - multiple occurrences in one file with empty replacement', () => {
  const message = GetReplacedMessage.getReplacedMessage(1, 3, '')
  expect(message).toBe('Replaced 3 occurrences across 1 file')
})

test('getReplacedMessage - multiple occurrences across multiple files with empty replacement', () => {
  const message = GetReplacedMessage.getReplacedMessage(3, 5, '')
  expect(message).toBe('Replaced 5 occurrences across 3 files')
})
