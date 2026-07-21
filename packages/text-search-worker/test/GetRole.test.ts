import { expect, test } from '@jest/globals'
import { AriaRoles } from '@lvce-editor/constants'
import * as GetRole from '../src/parts/GetRole/GetRole.ts'
import * as InputActionFlag from '../src/parts/InputActionFlag/InputActionFlag.ts'

test('getRole - checkbox disabled', () => {
  expect(GetRole.getRole(InputActionFlag.CheckBoxDisabled)).toBe(AriaRoles.CheckBox)
})

test('getRole - checkbox enabled', () => {
  expect(GetRole.getRole(InputActionFlag.CheckBoxEnabled)).toBe(AriaRoles.CheckBox)
})

test('getRole - button disabled', () => {
  expect(GetRole.getRole(InputActionFlag.ButtonDisabled)).toBe(undefined)
})

test('getRole - unknown flag', () => {
  expect(GetRole.getRole(-1)).toBe(undefined)
})
