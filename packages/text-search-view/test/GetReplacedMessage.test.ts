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
