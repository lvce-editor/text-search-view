import { expect, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { setLimit } from '../src/parts/SetLimit/SetLimit.ts'

test('setLimit - updates limit in state with empty value', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    limit: 20_000,
    value: '',
  }

  const result = await setLimit(state, 10_000)

  expect(result.limit).toBe(10_000)
  expect(result).not.toBe(state)
})

test('setLimit - updates limit to different value', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    limit: 10_000,
    value: '',
  }

  const result = await setLimit(state, 50_000)

  expect(result.limit).toBe(50_000)
  expect(result).not.toBe(state)
})

test('setLimit - updates limit to zero', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    limit: 20_000,
    value: '',
  }

  const result = await setLimit(state, 0)

  expect(result.limit).toBe(0)
  expect(result).not.toBe(state)
})

test('setLimit - updates limit to large value', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    limit: 20_000,
    value: '',
  }

  const result = await setLimit(state, 100_000)

  expect(result.limit).toBe(100_000)
  expect(result).not.toBe(state)
})
