import { expect, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CollapseDetails from '../src/parts/CollapseDetails/CollapseDetails.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'

test('collapseDetails - collapses expanded details', () => {
  const initialState: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    flags: SearchFlags.DetailsExpanded,
  }
  const newState = CollapseDetails.collapseDetails(initialState)
  expect(SearchFlags.hasDetailsExpanded(newState.flags)).toBe(false)
})

test.skip('collapseDetails - does nothing if already collapsed', () => {
  const initialState: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    flags: 0,
  }
  const newState = CollapseDetails.collapseDetails(initialState)
  expect(newState).toEqual(initialState)
})
