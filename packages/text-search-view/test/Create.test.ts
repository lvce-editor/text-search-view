import { expect, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as Create from '../src/parts/Create/Create.ts'
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
  expect(state.contextLines).toBe(1)
  expect(state.contextLinesEnabled).toBe(false)
  expect(state.isSearchEditor).toBe(false)
  expect(state.searchWarningFontFamily).toBe('system-ui')
  expect(state.searchWarningFontSize).toBe(12)
  expect(state.searchWarningHorizontalPadding).toBe(10)
  expect(state.searchWarningLineHeight).toBe(18)
  expect(state.searchWarningVerticalPadding).toBe(8)
})

test('create sets the search warning layout defaults', () => {
  const state = Create.create(1, 0, 0, 800, 600, '/test', '')

  expect(state.searchWarningFontFamily).toBe('system-ui')
  expect(state.searchWarningFontSize).toBe(12)
  expect(state.searchWarningHorizontalPadding).toBe(10)
  expect(state.searchWarningLineHeight).toBe(18)
  expect(state.searchWarningVerticalPadding).toBe(8)
})
