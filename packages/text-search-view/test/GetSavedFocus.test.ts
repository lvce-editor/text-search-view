import { expect, test } from '@jest/globals'
import { getSavedFocus, getSavedListFocus } from '../src/parts/GetSavedFocus/GetSavedFocus.ts'

test('getSavedFocus returns focus value when it exists and is a number', () => {
  const savedState = { focus: 5 }
  const result = getSavedFocus(savedState)
  expect(result).toBe(5)
})

test('getSavedFocus returns 0 when savedState is null', () => {
  const result = getSavedFocus(null)
  expect(result).toBe(0)
})

test('getSavedFocus returns 0 when savedState is undefined', () => {
  const result = getSavedFocus(undefined)
  expect(result).toBe(0)
})

test('getSavedFocus returns 0 when savedState is not an object', () => {
  const result = getSavedFocus('not an object')
  expect(result).toBe(0)
})

test('getSavedFocus returns 0 when focus does not exist', () => {
  const savedState = { other: 'value' }
  const result = getSavedFocus(savedState)
  expect(result).toBe(0)
})

test('getSavedFocus returns 0 when focus is not a number', () => {
  const savedState = { focus: 'not a number' }
  const result = getSavedFocus(savedState)
  expect(result).toBe(0)
})

test('getSavedFocus returns 0 when focus is null', () => {
  const savedState = { focus: null }
  const result = getSavedFocus(savedState)
  expect(result).toBe(0)
})

test('getSavedListFocus returns listFocused value when it exists and is a boolean', () => {
  const savedState = { listFocused: true }
  const result = getSavedListFocus(savedState)
  expect(result).toBe(true)
})

test('getSavedListFocus returns false when listFocused is false', () => {
  const savedState = { listFocused: false }
  const result = getSavedListFocus(savedState)
  expect(result).toBe(false)
})

test('getSavedListFocus returns false when savedState is null', () => {
  const result = getSavedListFocus(null)
  expect(result).toBe(false)
})

test('getSavedListFocus returns false when savedState is undefined', () => {
  const result = getSavedListFocus(undefined)
  expect(result).toBe(false)
})

test('getSavedListFocus returns false when savedState is not an object', () => {
  const result = getSavedListFocus('not an object')
  expect(result).toBe(false)
})

test('getSavedListFocus returns false when listFocused does not exist', () => {
  const savedState = { other: 'value' }
  const result = getSavedListFocus(savedState)
  expect(result).toBe(false)
})

test('getSavedListFocus returns false when listFocused is not a boolean', () => {
  const savedState = { listFocused: 'not a boolean' }
  const result = getSavedListFocus(savedState)
  expect(result).toBe(false)
})

test('getSavedListFocus returns false when listFocused is null', () => {
  const savedState = { listFocused: null }
  const result = getSavedListFocus(savedState)
  expect(result).toBe(false)
})
