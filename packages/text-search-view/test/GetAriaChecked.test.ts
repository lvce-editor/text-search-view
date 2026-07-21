import { expect, test } from '@jest/globals'
import * as GetAriaChecked from '../src/parts/GetAriaChecked/GetAriaChecked.ts'
import * as InputActionFlag from '../src/parts/InputActionFlag/InputActionFlag.ts'

test('getAriaChecked - checkbox disabled', () => {
  expect(GetAriaChecked.getAriaChecked(InputActionFlag.CheckBoxDisabled)).toBe(false)
})

test('getAriaChecked - checkbox enabled', () => {
  expect(GetAriaChecked.getAriaChecked(InputActionFlag.CheckBoxEnabled)).toBe(true)
})

test('getAriaChecked - unknown flag', () => {
  expect(GetAriaChecked.getAriaChecked(-1)).toBe(undefined)
})
