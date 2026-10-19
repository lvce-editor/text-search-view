import { expect, test } from '@jest/globals'
import { IconThemeWorker, RendererWorker, TextMeasurementWorker, TextSearchWorker } from '@lvce-editor/rpc-registry'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { loadContent } from '../src/parts/LoadContent/LoadContent.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'
import * as SearchViewStates from '../src/parts/SearchViewStates/SearchViewStates.ts'

test('loadContent with saved value calls handleUpdate', async () => {
  const state = CreateDefaultState.createDefaultState()
  const savedState = {
    excludeValue: 'exclude',
    flags: 1,
    includeValue: 'include',
    replacement: 'replacement',
    savedCollapsedPaths: [],
    threads: 4,
    value: 'test',
  }

  using _mockTextSearchWorker = TextSearchWorker.registerMockRpc({
    async 'TextSearch.search'() {
      return {
        limitHit: false,
        results: [],
      }
    },
  })
  using _mockRendererWorker = RendererWorker.registerMockRpc({
    'GetActiveEditor.getOpenEditorUris': () => [],
  })
  using _mockTextMeasurementWorker = TextMeasurementWorker.registerMockRpc({ 'TextMeasurement.measureTextBlockHeight': () => 13 })

  const result = await loadContent(state, savedState)

  expect(result).toMatchObject({
    excludeValue: 'exclude',
    flags: 1,
    includeValue: 'include',
    loaded: true,
    threads: 1,
    value: 'test',
  })
})

test('loadContent applies the configured result limit before restoring a search', async () => {
  using _mockRendererWorker = RendererWorker.registerMockRpc({
    'GetActiveEditor.getOpenEditorUris': () => [],
    async 'Preferences.get'(key: string) {
      if (key === 'textSearch.maxResults') {
        return 15_000
      }
      return undefined
    },
  })
  using _mockTextSearchWorker = TextSearchWorker.registerMockRpc({
    async 'TextSearch.search'() {
      return {
        limitHit: false,
        results: [],
      }
    },
  })
  using _mockTextMeasurementWorker = TextMeasurementWorker.registerMockRpc({ 'TextMeasurement.measureTextBlockHeight': () => 13 })
  const state = CreateDefaultState.createDefaultState()

  const result = await loadContent(state, { value: 'restored query' })

  expect(result.limit).toBe(15_000)
})

test('loadContent without saved value returns state with loaded flag', async () => {
  const state = CreateDefaultState.createDefaultState()
  const savedState = {
    excludeValue: '',
    flags: SearchFlags.UseIgnoreFiles | SearchFlags.ReplaceExpanded | SearchFlags.DetailsExpanded,
    includeValue: '',
    replacement: '',
    savedCollapsedPaths: [],
    threads: 4,
    value: '',
  }

  const result = await loadContent(state, savedState)

  expect(result).toMatchObject({
    flags: SearchFlags.UseIgnoreFiles | SearchFlags.ReplaceExpanded | SearchFlags.DetailsExpanded,
    headerHeight: 190,
    loaded: true,
    threads: 1,
  })
})

test('loadContent uses the search warning layout from state', async () => {
  using mockRendererWorker = RendererWorker.registerMockRpc({
    'MeasureTextHeight.measureTextBlockHeight': () => 20,
    'Preferences.get': () => undefined,
  })
  const state = {
    ...CreateDefaultState.createDefaultState(),
    limitHitWarning: 'warning',
    searchWarningFontFamily: 'custom-font',
    searchWarningFontSize: 14,
    searchWarningHorizontalPadding: 23,
    searchWarningLineHeight: 20,
    searchWarningVerticalPadding: 11,
    width: 120,
  }

  await loadContent(state, undefined)

  expect(mockRendererWorker.invocations).toContainEqual(['MeasureTextHeight.measureTextBlockHeight', 'warning', 'custom-font', 14, '20px', 97])
})

test('loadContent loads enabled search exclude settings', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Preferences.get': () => ({
      '**/*.tmp': false,
      '**/excluded': true,
    }),
  })
  const state = CreateDefaultState.createDefaultState()

  const result = await loadContent(state, undefined)

  expect(result.defaultExcludes).toEqual(['**/excluded'])
  expect(mockRpc.invocations).toEqual([
    ['Preferences.get', 'search.exclude'],
    ['Preferences.get', 'textSearch.maxResults'],
    ['Preferences.get', 'Search.showOpenInEditorLink'],
    ['Preferences.get', 'Search.usePullBasedSearch'],
  ])
})

test.each([false, true])('loadContent keeps the open in editor link hidden in a search editor with preference %s', async (preference) => {
  using _mockRendererWorker = RendererWorker.registerMockRpc({
    'Preferences.get'(key: string) {
      if (key === 'Search.showOpenInEditorLink') {
        return preference
      }
      return undefined
    },
  })
  const state = {
    ...CreateDefaultState.createDefaultState(),
    isSearchEditor: true,
  }

  const result = await loadContent(state, undefined)

  expect(result.showOpenInEditorLink).toBe(false)
})

test('loadContent with null savedState', async () => {
  const state = CreateDefaultState.createDefaultState()
  const savedState = null

  const result = await loadContent(state, savedState)

  expect(result).toMatchObject({
    loaded: true,
  })
})

test('loadContent with undefined savedState', async () => {
  const state = CreateDefaultState.createDefaultState()
  const savedState = undefined

  const result = await loadContent(state, savedState)

  expect(result).toMatchObject({
    loaded: true,
  })
})

test('loadContent preserves restored search results in the registered search editor', async () => {
  using _mockRendererWorker = RendererWorker.registerMockRpc({
    'MeasureTextHeight.measureTextBlockHeight': () => 18,
    'Preferences.get': () => undefined,
  })
  using _mockTextMeasurementWorker = TextMeasurementWorker.registerMockRpc({
    'TextMeasurement.measureTextBlockHeight': () => 18,
  })
  using _mockIconThemeWorker = IconThemeWorker.registerMockRpc({
    'IconTheme.getIcons': () => ['file-icon', undefined],
  })
  using _mockTextSearchWorker = TextSearchWorker.registerMockRpc({
    'TextSearch.search': () => ({
      limitHit: false,
      results: [
        { end: 0, lineNumber: 0, start: 0, text: 'test.txt', type: 1 },
        { end: 6, lineNumber: 1, start: 0, text: 'needle', type: 2 },
      ],
    }),
  })
  const state = {
    ...CreateDefaultState.createDefaultState(),
    height: 600,
    isSearchEditor: true,
    uid: 982,
    width: 400,
    workspaceUri: 'memfs:///workspace',
  }
  SearchViewStates.set(state.uid, state, state)

  await SearchViewStates.wrapCommand(loadContent)(state.uid, { value: 'needle' })

  expect(SearchViewStates.get(state.uid).newState).toMatchObject({
    fileCount: 1,
    initial: false,
    loaded: true,
    matchCount: 1,
    message: '1 result in 1 file',
    showOpenInEditorLink: false,
    value: 'needle',
  })
})
