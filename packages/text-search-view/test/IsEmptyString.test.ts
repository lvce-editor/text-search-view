import { expect, test } from '@jest/globals'
import * as Character from '../src/parts/Character/Character.ts'
import { isEmptyString } from '../src/parts/IsEmptyString/IsEmptyString.ts'

test('isEmptyString returns true for empty string', () => {
  const result = isEmptyString('')
  expect(result).toBe(true)
})

test('isEmptyString returns false for non-empty string', () => {
  const result = isEmptyString('Hello')
  expect(result).toBe(false)
})

test('isEmptyString returns false for string equal to Character.EmptyString', () => {
  const result = isEmptyString(Character.EmptyString)
  expect(result).toBe(true)
})

test('isEmptyString returns false for whitespace string', () => {
  const result = isEmptyString(' '.repeat(3))
  expect(result).toBe(false)
})
