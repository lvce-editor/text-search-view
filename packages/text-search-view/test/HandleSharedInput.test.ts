import { expect, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleSharedInput from '../src/parts/HandleSharedInput/HandleSharedInput.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'

test('handleSharedInput - search value input', async () => {
  const state: SearchState = CreateDefaultState.createDefaultState()
  const name = InputName.SearchValue
  const value = ''
  const inputSource = InputSource.User

  const result = await HandleSharedInput.handleSharedInput(state, name, value, inputSource)

  expect(result.value).toBe(value)
  expect(result.inputSource).toBe(inputSource)
  expect(result.loaded).toBe(true)
})

test('handleSharedInput - replacement value input', async () => {
  const state: SearchState = CreateDefaultState.createDefaultState()
  const name = InputName.ReplaceValue
  const value = 'replacement'
  const inputSource = InputSource.User

  const result = await HandleSharedInput.handleSharedInput(state, name, value, inputSource)

  expect(result.replacement).toBe(value)
  expect(result.inputSource).toBe(inputSource)
})

test('handleSharedInput - exclude files input', async () => {
  const state: SearchState = CreateDefaultState.createDefaultState()
  const name = InputName.FilesToExclude
  const value = '*.test.ts'
  const inputSource = InputSource.User

  const result = await HandleSharedInput.handleSharedInput(state, name, value, inputSource)

  expect(result.excludeValue).toBe(value)
  expect(result.inputSource).toBe(inputSource)
})

test('handleSharedInput - include files input', async () => {
  const state: SearchState = CreateDefaultState.createDefaultState()
  const name = InputName.FilesToInclude
  const value = '*.ts'
  const inputSource = InputSource.User

  const result = await HandleSharedInput.handleSharedInput(state, name, value, inputSource)

  expect(result.includeValue).toBe(value)
  expect(result.inputSource).toBe(inputSource)
})

test('handleSharedInput - uses default input source when not provided', async () => {
  const state: SearchState = CreateDefaultState.createDefaultState()
  const name = InputName.SearchValue
  const value = ''

  const result = await HandleSharedInput.handleSharedInput(state, name, value)

  expect(result.value).toBe(value)
  expect(result.inputSource).toBe(InputSource.Script)
})

test('handleSharedInput - unknown input handler throws error', () => {
  const state: SearchState = CreateDefaultState.createDefaultState()
  const name = 'unknown-handler'
  const value = 'test'

  expect(() => HandleSharedInput.handleSharedInput(state, name, value)).toThrow('unknown input handler: unknown-handler')
})
