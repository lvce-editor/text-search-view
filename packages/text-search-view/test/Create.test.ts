import { expect, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'

test('create', () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
  }
  expect(state).toBeDefined()
  expect(state.defaultExcludes).toEqual(['.git', 'node_modules'])
  expect(state.excludeValue).toBe('')
  expect(state.flags).toBe(SearchFlags.UseIgnoreFiles)
})
