import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { SearchResult } from '../src/parts/SearchResult/SearchResult.ts'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleUpdatePullBased } from '../src/parts/HandleUpdatePullBased/HandleUpdatePullBased.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'
import * as SearchStrings from '../src/parts/SearchStrings/SearchStrings.ts'
import * as SearchViewStates from '../src/parts/SearchViewStates/SearchViewStates.ts'
import { reset, set } from '../src/parts/TextSearchProviders/TextSearchProviders.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

test('handleUpdatePullBased - enables pull-based mode for file protocol and computes summary from latest state', async () => {
  using mockRendererWorker = RendererWorker.registerMockRpc({
    'MeasureTextHeight.measureTextBlockHeight': () => 18,
  })
  reset()
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    uid: 101,
    usePullBasedSearch: true,
    value: 'before',
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
  set({
    async ''(_scheme, _root, _query, options, _assetDir, _platform, searchId, uid) {
      seenOptions = options
      seenUid = uid as number
      const latest = SearchViewStates.get(uid as number)
      SearchViewStates.set(uid as number, latest.oldState, {
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

  const result = await handleUpdatePullBased(state, { value: 'test' })

  expect(result).toMatchObject({
    items: pulledResults,
    limitHit: true,
    limitHitWarning: SearchStrings.theResultSetOnlyContainsASubSetOfMatches(),
    listItems: pulledResults,
    message: '1 result in 1 file',
    value: 'test',
  })
  expect(seenOptions).toMatchObject({
    defaultExcludes: state.defaultExcludes,
    query: 'test',
    root: '/test',
    scheme: '',
    usePullBasedSearch: true,
  })
  expect(seenUid).toBe(101)
  expect(mockRendererWorker.invocations).toEqual([
    ['MeasureTextHeight.measureTextBlockHeight', expect.any(String), 'system-ui', 12, '18px', expect.any(Number)],
  ])
})

test('handleUpdatePullBased - disables pull-based mode for non-file protocol and ignores default excludes when flag is off', async () => {
  reset()
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    flags: 0,
    uid: 102,
    usePullBasedSearch: true,
    value: 'before',
    workspacePath: 'memfs://test',
  }

  let seenOptions: any
  set({
    async memfs(_scheme, _root, _query, options) {
      seenOptions = options
      return {
        limitHit: false,
        results: [],
      }
    },
  })

  const result = await handleUpdatePullBased(state, { value: 'test' })

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
    usePullBasedSearch: false,
  })
  expect(SearchFlags.hasUseIgnoreFiles(state.flags)).toBe(false)
})

test('handleUpdatePullBased - returns previous state when latest state cannot be retrieved', async () => {
  reset()
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    uid: 103,
    value: 'before',
    workspacePath: '/test',
  }

  let seenUid = -1
  set({
    async ''(_scheme, _root, _query, _options, _assetDir, _platform, _searchId, uid) {
      seenUid = uid as number
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
