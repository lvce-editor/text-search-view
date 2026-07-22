import { expect, test } from '@jest/globals'
import { IconThemeWorker, RendererWorker, TextSearchWorker } from '@lvce-editor/rpc-registry'
import type { SearchResult } from '../src/parts/SearchResult/SearchResult.ts'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import type { TextSearchOptions } from '../src/parts/TextSearchOptions/TextSearchOptions.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleUpdateFull } from '../src/parts/HandleUpdateFull/HandleUpdateFull.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'

test('handleUpdateFull - sets limitHit to true when search hits limit', async () => {
  using mockRpc = IconThemeWorker.registerMockRpc({
    'IconTheme.getIcons': () => ['file-icon', undefined],
  })
  const mockRendererWorker = RendererWorker.registerMockRpc({
    'MeasureTextHeight.measureTextBlockHeight': () => 18,
  })

  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    assetDir: '',
    excludeValue: '',
    flags: 0,
    headerHeight: 40,
    height: 500,
    includeValue: '',
    itemHeight: 20,
    minimumSliderSize: 20,
    platform: 0,
    threads: 0,
    value: 'test',
    workspacePath: '/test',
  }
  const update = { value: 'test' }
  const searchResults: readonly SearchResult[] = [
    { end: 0, lineNumber: 0, start: 0, text: 'file1.txt', type: 1 },
    { end: 6, lineNumber: 1, start: 0, text: 'match1', type: 2 },
  ]

  using _mockTextSearchWorker = TextSearchWorker.registerMockRpc({
    async 'TextSearch.search'(): Promise<{ results: readonly SearchResult[]; limitHit: boolean }> {
      return {
        limitHit: true,
        results: searchResults,
      }
    },
  })

  const result = await handleUpdateFull(state, update)

  expect(result).toMatchObject({
    fileCount: 1,
    headerHeight: 87,
    icons: ['file-icon', ''],
    items: searchResults,
    limitHit: true,
    listItems: searchResults,
    loaded: true,
    matchCount: 1,
    maxLineY: 2,
    message: '1 result in 1 file',
    searchInputErrorMessage: '',
    value: 'test',
  })
  expect(mockRpc.invocations).toEqual([['IconTheme.getIcons', [{ name: 'file1.txt', type: 1 }]]])
  expect(mockRendererWorker.invocations).toEqual([['MeasureTextHeight.measureTextBlockHeight', expect.any(String), 'system-ui', 12, '18px', 1]])
})

test('handleUpdateFull - sets limitHit to false when search does not hit limit', async () => {
  using mockRpc = IconThemeWorker.registerMockRpc({
    'IconTheme.getIcons': () => ['file-icon', undefined],
  })
  const mockRendererWorker = RendererWorker.registerMockRpc({
    'MeasureTextHeight.measureTextBlockHeight': () => 18,
  })

  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    assetDir: '',
    excludeValue: '',
    flags: 0,
    headerHeight: 40,
    height: 500,
    includeValue: '',
    itemHeight: 20,
    minimumSliderSize: 20,
    platform: 0,
    threads: 0,
    value: 'test',
    workspacePath: '/test',
  }
  const update = { value: 'test' }
  const searchResults: readonly SearchResult[] = [
    { end: 0, lineNumber: 0, start: 0, text: 'file1.txt', type: 1 },
    { end: 6, lineNumber: 1, start: 0, text: 'match1', type: 2 },
  ]

  using _mockTextSearchWorker = TextSearchWorker.registerMockRpc({
    async 'TextSearch.search'(): Promise<{ results: readonly SearchResult[]; limitHit: boolean }> {
      return {
        limitHit: false,
        results: searchResults,
      }
    },
  })

  const result = await handleUpdateFull(state, update)

  expect(result).toMatchObject({
    fileCount: 1,
    headerHeight: 61,
    icons: ['file-icon', ''],
    items: searchResults,
    limitHit: false,
    listItems: searchResults,
    loaded: true,
    matchCount: 1,
    maxLineY: 2,
    message: '1 result in 1 file',
    searchInputErrorMessage: '',
    value: 'test',
  })
  expect(mockRpc.invocations).toEqual([['IconTheme.getIcons', [{ name: 'file1.txt', type: 1 }]]])
  expect(mockRendererWorker.invocations).toEqual([])
})

test('handleUpdateFull - passes enabled search options to the provider', async () => {
  let receivedOptions: TextSearchOptions | undefined
  using _mockTextSearchWorker = TextSearchWorker.registerMockRpc({
    async 'TextSearch.search'(
      _root: string,
      _query: string,
      options: TextSearchOptions,
    ): Promise<{ results: readonly SearchResult[]; limitHit: boolean }> {
      receivedOptions = options
      return {
        limitHit: false,
        results: [],
      }
    },
  })
  const flags = SearchFlags.MatchCase | SearchFlags.MatchWholeWord | SearchFlags.UseIgnoreFiles | SearchFlags.UseRegularExpression
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    flags,
    usePullBasedSearch: true,
    value: 'test',
    workspacePath: '/test',
  }

  const result = await handleUpdateFull(state, {})

  expect(receivedOptions).toMatchObject({
    defaultExcludes: state.defaultExcludes,
    isCaseSensitive: true,
    matchWholeWord: true,
    useIgnoreFiles: true,
    usePullBasedSearch: true,
    useRegularExpression: true,
  })
  expect(result.searchId).not.toBe('')
})

test('handleUpdateFull - rejects a provider result that is not an array', async () => {
  using _mockTextSearchWorker = TextSearchWorker.registerMockRpc({
    async 'TextSearch.search'(): Promise<any> {
      return {
        limitHit: false,
        results: {},
      }
    },
  })
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    value: 'test',
    workspacePath: '/test',
  }

  await expect(handleUpdateFull(state, {})).rejects.toThrow('results must be of type array')
})
