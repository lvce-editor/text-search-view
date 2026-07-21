import { expect, test } from '@jest/globals'
import * as GetReplaceAllConfirmText from '../src/parts/GetReplaceAllConfirmText/GetReplaceAllConfirmText.ts'

test('getReplaceAllConfirmText - one occurrence with replacement', () => {
  expect(GetReplaceAllConfirmText.getReplaceAllConfirmText(1, 1, 'newText')).toBe("Replace 1 occurrence across 1 file with 'newText'")
})

test('getReplaceAllConfirmText - one occurrence without replacement', () => {
  expect(GetReplaceAllConfirmText.getReplaceAllConfirmText(1, 1, '')).toBe('Replace 1 occurrence across 1 file')
})

test('getReplaceAllConfirmText - multiple occurrences in one file with replacement', () => {
  expect(GetReplaceAllConfirmText.getReplaceAllConfirmText(3, 1, 'newText')).toBe("Replace 3 occurrences across 1 file with 'newText'")
})

test('getReplaceAllConfirmText - multiple occurrences in one file without replacement', () => {
  expect(GetReplaceAllConfirmText.getReplaceAllConfirmText(3, 1, '')).toBe('Replace 3 occurrences across 1 file')
})

test('getReplaceAllConfirmText - multiple occurrences in multiple files with replacement', () => {
  expect(GetReplaceAllConfirmText.getReplaceAllConfirmText(5, 3, 'newText')).toBe("Replace 5 occurrences across 3 files with 'newText'")
})

test('getReplaceAllConfirmText - multiple occurrences in multiple files without replacement', () => {
  expect(GetReplaceAllConfirmText.getReplaceAllConfirmText(5, 3, '')).toBe('Replace 5 occurrences across 3 files')
})
