import { expect, test } from '@jest/globals'
import { RendererWorker, TextMeasurementWorker, TextSearchWorker } from '@lvce-editor/rpc-registry'
import type { SearchResult } from '../src/parts/SearchResult/SearchResult.ts'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleUpdate } from '../src/parts/HandleUpdate/HandleUpdate.ts'
import { handleUpdatePullBased } from '../src/parts/HandleUpdatePullBased/HandleUpdatePullBased.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'
import * as SearchStrings from '../src/parts/SearchStrings/SearchStrings.ts'
import * as SearchViewStates from '../src/parts/SearchViewStates/SearchViewStates.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

test('handleUpdate - routes to pull-based mode for file protocol and computes summary from latest state', async () => {
  using _mockTextMeasurementWorker = TextMeasurementWorker.registerMockRpc({
    'TextMeasurement.measureTextBlockHeight': () => 13,
  })
  using mockRendererWorker = RendererWorker.registerMockRpc({
    'MeasureTextHeight.measureTextBlockHeight': () => 18,
  })
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    contextLines: 2,
    contextLinesEnabled: true,
    searchWarningFontFamily: 'custom-font',
    searchWarningFontSize: 14,
    searchWarningHorizontalPadding: 23,
    searchWarningLineHeight: 20,
    searchWarningVerticalPadding: 11,
    uid: 101,
    usePullBasedSearch: true,
    value: 'before',
    width: 120,
    workspacePath: '/test',
  }

  const pulledResults: readonly SearchResult[] = [
    {
      end: 0,
      lineNumber: 0,
      start: 0,
      text: 'file1.txt',
      type: TextSearchResultType.File,
    },
    {
      end: 4,
      lineNumber: 1,
      start: 0,
      text: 'test',
      type: TextSearchResultType.Match,
    },
  ]

  let seenOptions: any
  let seenUid = -1
  using _mockTextSearchWorker = TextSearchWorker.registerMockRpc({
    async 'TextSearch.search'(_root: string, _query: string, options: any, _assetDir: string, _platform: number, searchId: string, uid: number) {
      seenOptions = options
      seenUid = uid
      const latest = SearchViewStates.get(uid)
      SearchViewStates.set(uid, latest.oldState, {
        ...latest.newState,
        items: pulledResults,
        listItems: pulledResults,
        searchId: searchId || '',
      })
      return {
        limitHit: true,
        results: [],
      }
    },
  })

  await handleUpdate(state, { value: 'test' })
  const result = SearchViewStates.get(state.uid).newState

  expect(result).toMatchObject({
    items: pulledResults,
    limitHit: true,
    limitHitWarning: SearchStrings.theResultSetOnlyContainsASubSetOfMatches(),
    listItems: pulledResults,
    message: '1 result in 1 file',
    value: 'test',
  })
  expect(seenOptions).toMatchObject({
    contextLines: 2,
    defaultExcludes: state.defaultExcludes,
    query: 'test',
    root: '/test',
    scheme: '',
    useIgnoreFiles: true,
    usePullBasedSearch: true,
  })
  expect(seenUid).toBe(101)
  expect(mockRendererWorker.invocations).toEqual([['MeasureTextHeight.measureTextBlockHeight', expect.any(String), 'custom-font', 14, '20px', 97]])
})

test('handleUpdatePullBased - disables pull-based mode for non-file protocol and ignores default excludes when flag is off', async () => {
  using _mockTextMeasurementWorker = TextMeasurementWorker.registerMockRpc({
    'TextMeasurement.measureTextBlockHeight': () => 13,
  })
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    flags: 0,
    uid: 102,
    usePullBasedSearch: true,
    value: 'before',
    workspacePath: 'memfs://test',
  }

  let seenOptions: any
  using _mockTextSearchWorker = TextSearchWorker.registerMockRpc({
    async 'TextSearch.search'(_root: string, _query: string, options: any) {
      seenOptions = options
      return {
        limitHit: false,
        results: [],
      }
    },
  })

  await handleUpdatePullBased(state, { value: 'test' })
  const result = SearchViewStates.get(state.uid).newState

  expect(result).toMatchObject({
    items: [],
    limitHit: false,
    limitHitWarning: '',
    listItems: [],
    message: 'No results found',
    value: 'test',
  })
  expect(seenOptions).toMatchObject({
    defaultExcludes: [],
    scheme: 'memfs',
    useIgnoreFiles: false,
    usePullBasedSearch: false,
  })
  expect(SearchFlags.hasUseIgnoreFiles(state.flags)).toBe(false)
})

test('handleUpdatePullBased - returns previous state when latest state cannot be retrieved', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    uid: 103,
    value: 'before',
    workspacePath: '/test',
  }

  let seenUid = -1
  using _mockTextSearchWorker = TextSearchWorker.registerMockRpc({
    async 'TextSearch.search'(_root: string, _query: string, _options: any, _assetDir: string, _platform: number, _searchId: string, uid: number) {
      seenUid = uid
      return {
        limitHit: false,
        results: [],
      }
    },
  })

  const result = await handleUpdatePullBased(state, {
    uid: 104,
    value: 'test',
  })

  expect(result).toBe(state)
  expect(seenUid).toBe(104)
})

test('handleUpdatePullBased - does not overwrite state after the active search changes', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    uid: 105,
    value: 'before',
    workspacePath: '/test',
  }
  let latestState: SearchState | undefined
  using _mockTextSearchWorker = TextSearchWorker.registerMockRpc({
    async 'TextSearch.search'() {
      const latest = SearchViewStates.get(state.uid)
      latestState = {
        ...latest.newState,
        message: "Replaced 0 occurrences across 0 files with 'new-text'",
        searchId: '',
      }
      SearchViewStates.set(state.uid, latest.oldState, latestState)
      return {
        limitHit: false,
        results: [],
      }
    },
  })

  const result = await handleUpdatePullBased(state, { value: 'test' })

  expect(result).toBe(state)
  expect(SearchViewStates.get(state.uid).newState).toBe(latestState)
})
