import { expect, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'
import * as ToggleMatchWholeWord from '../src/parts/ToggleMatchWholeWord/ToggleMatchWholeWord.ts'

test('toggleMatchWholeWord', async () => {
  const initialState: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    flags: 0,
  }
  const newState = await ToggleMatchWholeWord.toggleMatchWholeWord(initialState)
  expect(SearchFlags.hasMatchWholeWord(newState.flags)).toBe(true)
})
