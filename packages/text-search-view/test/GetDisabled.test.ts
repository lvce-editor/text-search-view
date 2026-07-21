import { expect, test } from '@jest/globals'
import * as GetDisabled from '../src/parts/GetDisabled/GetDisabled.ts'
import * as InputActionFlag from '../src/parts/InputActionFlag/InputActionFlag.ts'

test('getDisabled - button disabled', () => {
  expect(GetDisabled.getDisabled(InputActionFlag.ButtonDisabled)).toBe(true)
})

test('getDisabled - button enabled', () => {
  expect(GetDisabled.getDisabled(InputActionFlag.ButtonEnabled)).toBe(undefined)
})

test('getDisabled - unknown flag', () => {
  expect(GetDisabled.getDisabled(-1)).toBe(undefined)
})
