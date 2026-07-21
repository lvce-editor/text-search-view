import { expect, jest, test } from '@jest/globals'
import type { SearchResult } from '../src/parts/SearchResult/SearchResult.ts'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleUpdate } from '../src/parts/HandleUpdate/HandleUpdate.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'
import { add } from '../src/parts/TextSearchProviders/TextSearchProviders.ts'

test('handleUpdate - empty search value returns cleared state', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    value: '',
  }
  const update = { value: '' }

  const result = await handleUpdate(state, update)

  expect(result).toEqual({
    ...state,
    ...update,
    deltaY: 0,
    items: [],
    limitHit: false,
    listItems: [],
    loaded: true,
    matchCount: 0,
    maxLineY: 0,
    message: '',
    minLineY: 0,
    searchInputErrorMessage: '',
  })
})

test.skip('handleUpdate - performs search with valid input', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    headerHeight: 40,
    height: 500,
    itemHeight: 20,
    minimumSliderSize: 20,
    value: 'test',
    workspacePath: '/test',
  }
  const update = { value: 'test' }
  const searchResults: readonly SearchResult[] = [
    { end: 0, lineNumber: 0, start: 0, text: 'file1.txt', type: 1 },
    { end: 0, lineNumber: 0, start: 0, text: 'match1', type: 2 },
  ]

  add({
    async ''(): Promise<{ results: readonly SearchResult[]; limitHit: boolean }> {
      return {
        limitHit: false,
        results: searchResults,
      }
    },
  })

  const result = await handleUpdate(state, update)

  expect(result).toMatchObject({
    ...state,
    fileCount: 1,
    items: searchResults,
    limitHit: false,
    listItems: searchResults,
    loaded: true,
    matchCount: 1,
    searchInputErrorMessage: '',
    value: 'test',
  })
})

test('handleUpdate - handles search error', async () => {
  const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    value: 'test',
  }
  const update = { value: 'test' }

  add({
    async ''(): Promise<{ results: readonly SearchResult[]; limitHit: boolean }> {
      throw new Error('Search failed')
    },
  })

  try {
    const result = await handleUpdate(state, update)

    expect(result).toMatchObject({
      ...state,
      fileCount: 0,
      items: [],
      limitHit: false,
      listItems: [],
      matchCount: 0,
      maxLineY: 0,
      message: 'Error: Search failed',
      minLineY: 0,
    })
    expect(consoleErrorSpy).toHaveBeenCalledWith('[text-search-worker] Error: Search failed')
  } finally {
    consoleErrorSpy.mockRestore()
  }
})

test('handleUpdate - returns a validation error for an invalid regular expression', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    flags: SearchFlags.UseRegularExpression,
    value: '[',
  }

  const result = await handleUpdate(state, {})

  expect(result.searchInputErrorMessage).toMatch(/Invalid regular expression/)
})

test.skip('handleUpdate - uses search flags from state', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    flags: SearchFlags.MatchCase | SearchFlags.UseRegularExpression,
    value: 'test',
    workspacePath: '/test',
  }
  const update = { value: 'test' }

  add({
    async ''(): Promise<{ results: readonly SearchResult[]; limitHit: boolean }> {
      return {
        limitHit: false,
        results: [],
      }
    },
  })

  await handleUpdate(state, update)
})
