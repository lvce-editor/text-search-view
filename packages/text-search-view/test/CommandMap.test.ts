import { expect, test } from '@jest/globals'
import { IconThemeWorker, RendererWorker, TextMeasurementWorker, TextSearchWorker } from '@lvce-editor/rpc-registry'
import type { SearchResult } from '../src/parts/SearchResult/SearchResult.ts'
import type { TextSearchOptions } from '../src/parts/TextSearchOptions/TextSearchOptions.ts'
import { commandMap } from '../src/parts/CommandMap/CommandMap.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'
import * as SearchViewStates from '../src/parts/SearchViewStates/SearchViewStates.ts'

test('runs overlapping search input commands in invocation order', async () => {
  using _mockTextMeasurementWorker = TextMeasurementWorker.registerMockRpc({
    'TextMeasurement.measureTextBlockHeight': () => 13,
  })
  using _mockIconThemeWorker = IconThemeWorker.registerMockRpc({
    'IconTheme.getIcons': () => ['file-icon', undefined],
  })
  using _mockRendererWorker = RendererWorker.registerMockRpc({
    'MeasureTextHeight.measureTextBlockHeight': () => 18,
  })
  const { promise: firstSearch, resolve: resolveFirstSearch } = Promise.withResolvers<void>()
  const regexResults: readonly SearchResult[] = [
    { end: 0, lineNumber: 0, start: 0, text: 'test.css', type: 1 },
    { end: 3, lineNumber: 1, start: 0, text: 'abc', type: 2 },
  ]
  let searchCount = 0
  using _mockTextSearchWorker = TextSearchWorker.registerMockRpc({
    async 'TextSearch.search'(_root: string, _query: string, options: TextSearchOptions) {
      searchCount++
      if (searchCount === 1) {
        await firstSearch
      }
      return {
        limitHit: false,
        results: options.useRegularExpression ? regexResults : [],
      }
    },
  })
  const state = {
    ...CreateDefaultState.createDefaultState(),
    uid: 107,
    workspaceUri: 'file:///test',
  }
  SearchViewStates.set(state.uid, state, state)

  const setValue = commandMap['TextSearch.handleInput'](state.uid, 'a.c')
  const toggleReplace = commandMap['TextSearch.toggleReplace'](state.uid)
  const setReplacement = commandMap['TextSearch.handleReplaceInput'](state.uid, 'adc')
  const toggleRegex = commandMap['TextSearch.toggleUseRegularExpression'](state.uid)

  await Promise.resolve()
  expect(searchCount).toBe(1)
  resolveFirstSearch()
  await Promise.all([setValue, toggleReplace, setReplacement, toggleRegex])

  const result = SearchViewStates.get(state.uid).newState
  expect(result).toMatchObject({
    flags: state.flags | SearchFlags.ReplaceExpanded | SearchFlags.UseRegularExpression,
    message: '1 result in 1 file',
    replacement: 'adc',
    value: 'a.c',
  })
})
