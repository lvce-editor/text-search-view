import { expect, test } from '@jest/globals'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as GetFlags from '../src/parts/GetFlags/GetFlags.ts'
import * as SearchViewStates from '../src/parts/SearchViewStates/SearchViewStates.ts'

test('getFlags - gets flags from instance', () => {
  const uid = 1
  const initialState = {
    ...CreateDefaultState.createDefaultState(),
    flags: 42,
  }
  SearchViewStates.set(uid, initialState, initialState)
  expect(GetFlags.getFlags(uid)).toBe(42)
})
