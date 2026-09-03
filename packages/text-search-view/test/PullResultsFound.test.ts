import { expect, test } from '@jest/globals'
import { IconThemeWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handlePullResultsFound } from '../src/parts/HandlePullResultsFound/HandlePullResultsFound.ts'
import * as SearchViewStates from '../src/parts/SearchViewStates/SearchViewStates.ts'
import * as TextMeasurementWorker from '../src/parts/TextMeasurementWorker/TextMeasurementWorker.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

test('handlePullResultsFound - ignores a result after the active search changes', async () => {
  const state = {
    ...CreateDefaultState.createDefaultState(),
    searchId: 'active-search',
  }
  const latestState = {
    ...state,
    searchId: 'new-search',
  }
  SearchViewStates.set(state.uid, state, latestState)

  const result = await handlePullResultsFound(state, 'active-search', [])

  expect(result).toBe(state)
  expect(SearchViewStates.get(state.uid).newState).toBe(latestState)
})

test('handlePullResultsFound - ignores a result when the active search changes while loading icons', async () => {
  using mockRendererWorker = RendererWorker.registerMockRpc({
    'Search.rerender': () => undefined,
  })
  const state = {
    ...CreateDefaultState.createDefaultState(),
    searchId: 'active-search',
    uid: 602,
  }
  const latestState = {
    ...state,
    searchId: 'new-search',
  }
  SearchViewStates.set(state.uid, state, state)
  using _mockTextMeasurementWorker = TextMeasurementWorker.registerMockRpc({
    'TextMeasurement.measureTextBlockHeight'() {
      SearchViewStates.set(state.uid, state, latestState)
      return 13
    },
  })
  IconThemeWorker.registerMockRpc({
    'IconTheme.getIcons': () => ['file-icon'],
  })
  const newResults = [{ end: 0, lineNumber: 0, start: 0, text: 'file1.txt', type: TextSearchResultType.File }]

  const result = await handlePullResultsFound(state, 'active-search', newResults)

  expect(result).toBe(state)
  expect(SearchViewStates.get(state.uid).newState).toBe(latestState)
  expect(mockRendererWorker.invocations).toEqual([])
})

test('handlePullResultsFound - merges results received from the text search worker', async () => {
  using _mockTextMeasurementWorker = TextMeasurementWorker.registerMockRpc({
    'TextMeasurement.measureTextBlockHeight': () => 13,
  })
  using mockRendererWorker = RendererWorker.registerMockRpc({
    'Search.rerender': () => undefined,
  })
  IconThemeWorker.registerMockRpc({
    'IconTheme.getIcons': () => ['file-icon'],
  })

  const state = {
    ...CreateDefaultState.createDefaultState(),
    headerHeight: 40,
    height: 500,
    itemHeight: 20,
    minimumSliderSize: 20,
    searchId: 'active-search',
  }
  SearchViewStates.set(state.uid, state, state)

  const newResults = [
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
  const result = await handlePullResultsFound(state, 'active-search', newResults)
  const { newState } = SearchViewStates.get(state.uid)

  expect(result).toBe(state)
  expect(newState).toMatchObject({
    fileCount: 1,
    icons: ['file-icon', ''],
    items: [
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
    ],
    limitHit: false,
    listItems: [
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
    ],
    loaded: true,
    matchCount: 1,
    maxLineY: 2,
    message: '1 result in 1 file',
  })
  expect(mockRendererWorker.invocations).toEqual([['Search.rerender']])
})
