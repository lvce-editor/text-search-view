import { expect, test } from '@jest/globals'
import { UseRegularExpression } from '../src/parts/SearchFlags/SearchFlags.ts'
import * as ValidateSearchInput from '../src/parts/ValidateSearchInput/ValidateSearchInput.ts'

test('validateSearchInput - empty string returns empty error message', () => {
  expect(ValidateSearchInput.validateSearchInput('', UseRegularExpression)).toBe('')
})

test('validateSearchInput - regular expression disabled returns empty error message', () => {
  expect(ValidateSearchInput.validateSearchInput('test[', 0)).toBe('')
})

test('validateSearchInput - valid regular expression returns empty error message', () => {
  expect(ValidateSearchInput.validateSearchInput('test.*', UseRegularExpression)).toBe('')
})

const getExpectedMessage = (): string => {
  // @ts-ignore
  if (process.versions.bun) {
    return 'Invalid regular expression: missing terminating ] for character class'
  }
  return 'Invalid regular expression: /[/u: Unterminated character class'
}

test('validateSearchInput - invalid regular expression returns error message', () => {
  const expectedMessage = getExpectedMessage()
  expect(ValidateSearchInput.validateSearchInput('[', UseRegularExpression)).toBe(expectedMessage)
})

test('validateSearchInput - complex valid regex returns empty error message', () => {
  expect(ValidateSearchInput.validateSearchInput(String.raw`(foo|bar)+\s\d+`, UseRegularExpression)).toBe('')
})

test('validateSearchInput - unescaped special characters returns error message', () => {
  expect(ValidateSearchInput.validateSearchInput('\\', UseRegularExpression)).toMatch(/Invalid regular expression/)
})

test('validateSearchInput - unicode flag is supported', () => {
  expect(ValidateSearchInput.validateSearchInput(String.raw`\p{Script=Latin}`, UseRegularExpression)).toBe('')
})

test('validateSearchInput - null or undefined value returns empty error message', () => {
  // @ts-expect-error
  expect(ValidateSearchInput.validateSearchInput(null, UseRegularExpression)).toBe('')
  // @ts-expect-error
  expect(ValidateSearchInput.validateSearchInput(undefined, UseRegularExpression)).toBe('')
})
