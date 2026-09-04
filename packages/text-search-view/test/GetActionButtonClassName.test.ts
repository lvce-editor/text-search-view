import { expect, test } from '@jest/globals'
import * as GetActionButtonClassName from '../src/parts/GetActionButtonClassName/GetActionButtonClassName.ts'

test('getActionButtonClassName - enabled', () => {
  expect(GetActionButtonClassName.getActionButtonClassName(true)).toBe('IconButton')
})

test('getActionButtonClassName - disabled', () => {
  expect(GetActionButtonClassName.getActionButtonClassName(false)).toBe('IconButton IconButtonDisabled')
})

test('getActionButtonClassName - no enabled state', () => {
  expect(GetActionButtonClassName.getActionButtonClassName(undefined)).toBe('IconButton IconButtonDisabled')
})
