import { expect, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CollapseReplace from '../src/parts/CollapseReplace/CollapseReplace.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'

test('collapseReplace removes ReplaceExpanded flag when it is set', () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    flags: SearchFlags.ReplaceExpanded,
  }

  const result = CollapseReplace.collapseReplace(state)

  expect(result.flags).toBe(0)
  expect(SearchFlags.hasReplaceExpanded(result.flags)).toBe(false)
  expect(result).not.toBe(state)
  expect(result.flags).not.toBe(state.flags)
})

test('collapseReplace keeps ReplaceExpanded flag removed when it is not set', () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    flags: 0,
  }

  const result = CollapseReplace.collapseReplace(state)

  expect(result.flags).toBe(0)
  expect(SearchFlags.hasReplaceExpanded(result.flags)).toBe(false)
})

test('collapseReplace preserves other flags', () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    flags: SearchFlags.ReplaceExpanded | SearchFlags.MatchCase | SearchFlags.UseRegularExpression,
  }

  const result = CollapseReplace.collapseReplace(state)

  expect(SearchFlags.hasReplaceExpanded(result.flags)).toBe(false)
  expect(SearchFlags.hasMatchCase(result.flags)).toBe(true)
  expect(SearchFlags.hasUseRegularExpression(result.flags)).toBe(true)
})

test('collapseReplace preserves all state properties except flags', () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    flags: SearchFlags.ReplaceExpanded,
    uid: 123,
    value: 'test',
    x: 100,
    y: 200,
  }

  const result = CollapseReplace.collapseReplace(state)

  expect(result.uid).toBe(state.uid)
  expect(result.x).toBe(state.x)
  expect(result.y).toBe(state.y)
  expect(result.value).toBe(state.value)
  expect(result.flags).not.toBe(state.flags)
})
