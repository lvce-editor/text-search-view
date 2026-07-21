import { test, expect } from '@jest/globals'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleInputBlur } from '../src/parts/HandleInputBlur/HandleInputBlur.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'

test('handleInputBlur returns the same state', async () => {
  const state = CreateDefaultState.createDefaultState()
  const result = await handleInputBlur(state, InputName.SearchValue)
  expect(result).toBe(state)
})

test('handleInputBlur returns the same state with different name', async () => {
  const state = CreateDefaultState.createDefaultState()
  const result = await handleInputBlur(state, InputName.ReplaceValue)
  expect(result).toBe(state)
})

test('handleInputBlur returns the same state with modified state', async () => {
  const state = {
    ...CreateDefaultState.createDefaultState(),
    value: 'test',
  }
  const result = await handleInputBlur(state, InputName.SearchValue)
  expect(result).toBe(state)
})
