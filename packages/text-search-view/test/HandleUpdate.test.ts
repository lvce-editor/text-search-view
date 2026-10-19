import { expect, jest, test } from '@jest/globals'
import { RendererWorker, TextMeasurementWorker, TextSearchWorker } from '@lvce-editor/rpc-registry'
import type { SearchResult } from '../src/parts/SearchResult/SearchResult.ts'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import type { TextSearchOptions } from '../src/parts/TextSearchOptions/TextSearchOptions.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleUpdate } from '../src/parts/HandleUpdate/HandleUpdate.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'
import * as SearchViewStates from '../src/parts/SearchViewStates/SearchViewStates.ts'

const RE_INVALID_REGULAR_EXPRESSION = /Invalid regular expression/

test('handleUpdate - empty search value returns cleared state', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    scrollBarHeight: 20,
    searchId: 'active-search',
    uid: 901,
    value: '',
  }
  const update = { value: '' }
  SearchViewStates.set(state.uid, state, state)

  const resultPromise = handleUpdate(state, update)

  expect(SearchViewStates.get(state.uid).newState).toMatchObject({
    scrollBarHeight: 0,
    searchId: '',
  })

  const result = await resultPromise

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
    scrollBarHeight: 0,
    searchId: '',
    searchInputErrorMessage: '',
    searchRootUri: '',
  })
})

test('handleUpdate - searches open editors when there is no workspace', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    uid: 902,
    value: '',
  }
  const update = { value: 'test' }
  SearchViewStates.set(state.uid, state, state)

  using mockRendererWorker = RendererWorker.registerMockRpc({
    'GetActiveEditor.getOpenEditorUris': () => ['file:///workspace/README.md', 'file:///workspace/src/app.ts'],
  })
  using _mockTextMeasurementWorker = TextMeasurementWorker.registerMockRpc({
    'TextMeasurement.measureTextBlockHeight': () => 13,
  })
  using mockTextSearchWorker = TextSearchWorker.registerMockRpc({
    async 'TextSearch.search'(_root: string, _query: string, options: TextSearchOptions) {
      expect(options.openEditorUris).toEqual(['file:///workspace/README.md', 'file:///workspace/src/app.ts'])
      return { limitHit: false, results: [] }
    },
  })
  await handleUpdate(state, update)

  expect(mockRendererWorker.invocations).toEqual([['GetActiveEditor.getOpenEditorUris']])
  expect(mockTextSearchWorker.invocations[0].slice(0, 3)).toEqual(['TextSearch.search', 'file:///workspace/', 'test'])
})

test.skip('handleUpdate - performs search with valid input', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    headerHeight: 40,
    height: 500,
    itemHeight: 20,
    minimumSliderSize: 20,
    value: 'test',
    workspaceUri: 'file:///test',
  }
  const update = { value: 'test' }
  const searchResults: readonly SearchResult[] = [
    { end: 0, lineNumber: 0, start: 0, text: 'file1.txt', type: 1 },
    { end: 0, lineNumber: 0, start: 0, text: 'match1', type: 2 },
  ]

  using _mockTextSearchWorker = TextSearchWorker.registerMockRpc({
    async 'TextSearch.search'() {
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
  using _mockTextMeasurementWorker = TextMeasurementWorker.registerMockRpc({
    'TextMeasurement.measureTextBlockHeight': () => 13,
  })
  const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    value: 'test',
    workspaceUri: 'file:///test',
  }
  const update = { value: 'test' }

  using _mockTextSearchWorker = TextSearchWorker.registerMockRpc({
    async 'TextSearch.search'() {
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
    expect(consoleErrorSpy).toHaveBeenCalledWith('[text-search-view] Error: Search failed')
  } finally {
    consoleErrorSpy.mockRestore()
  }
})

test('handleUpdate - returns a validation error for an invalid regular expression', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    flags: SearchFlags.UseRegularExpression,
    value: '[',
    workspaceUri: 'file:///test',
  }

  const result = await handleUpdate(state, {})

  expect(result.searchInputErrorMessage).toMatch(RE_INVALID_REGULAR_EXPRESSION)
})

test.skip('handleUpdate - uses search flags from state', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    flags: SearchFlags.MatchCase | SearchFlags.UseRegularExpression,
    value: 'test',
    workspaceUri: 'file:///test',
  }
  const update = { value: 'test' }

  using _mockTextSearchWorker = TextSearchWorker.registerMockRpc({
    async 'TextSearch.search'() {
      return {
        limitHit: false,
        results: [],
      }
    },
  })

  const result = await handleUpdate(state, update)

  expect(result.flags).toBe(SearchFlags.MatchCase | SearchFlags.UseRegularExpression)
})
