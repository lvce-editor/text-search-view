import { expect, test } from '@jest/globals'
import { hasStringProperty } from '../src/parts/HasProperty/HasProperty.ts'

test('hasStringProperty returns true when the property is a string', () => {
  expect(hasStringProperty({ value: 'test' }, 'value')).toBe(true)
})

test('hasStringProperty returns false when the property is not a string', () => {
  expect(hasStringProperty({ value: 1 }, 'value')).toBe(false)
})

test('hasStringProperty returns false when the property does not exist', () => {
  expect(hasStringProperty({}, 'value')).toBe(false)
})
