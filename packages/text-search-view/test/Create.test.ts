import { expect, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import { create } from '../src/parts/Create/Create.ts'
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
  const state = create(1, 0, 0, 800, 600, '/test', '')

  expect(state.searchWarningFontFamily).toBe('system-ui')
  expect(state.searchWarningFontSize).toBe(12)
  expect(state.searchWarningHorizontalPadding).toBe(10)
  expect(state.searchWarningLineHeight).toBe(18)
  expect(state.searchWarningVerticalPadding).toBe(8)
})

test('create - uses default optional values', () => {
  const state = create(1, 2, 3, 400, 500, '/workspace', '/assets')

  expect(state).toMatchObject({
    assetDir: '/assets',
    height: 500,
    isSearchEditor: false,
    itemHeight: 22,
    platform: undefined,
    replacement: '',
    uid: 1,
    value: '',
    width: 400,
    workspacePath: '/workspace',
    x: 2,
    y: 3,
  })
})

test('create - preserves explicit optional values', () => {
  const state = create(2, 3, 4, 500, 600, '/workspace', '/assets', 18, 'query', 'replacement', 7, true)

  expect(state).toMatchObject({
    isSearchEditor: true,
    itemHeight: 18,
    platform: 7,
    replacement: 'replacement',
    value: 'query',
  })
})
