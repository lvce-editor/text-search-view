import { expect, test } from '@jest/globals'
import { IconThemeWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handlePullResultsFound } from '../src/parts/HandlePullResultsFound/HandlePullResultsFound.ts'
import * as SearchViewStates from '../src/parts/SearchViewStates/SearchViewStates.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

test('handlePullResultsFound - ignores stale search id', async () => {
  const state = {
    ...CreateDefaultState.createDefaultState(),
    searchId: 'active-search',
  }

  const result = await handlePullResultsFound(state, 'stale-search')

  expect(result).toBe(state)
})

test('handlePullResultsFound - fetches and merges pull results', async () => {
  using mockRendererWorker = RendererWorker.registerMockRpc({
    'Search.rerender': () => undefined,
    'SearchProcess.invoke': () => [
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

  const result = await handlePullResultsFound(state, 'active-search')
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
  expect(mockRendererWorker.invocations).toEqual([['SearchProcess.invoke', 'TextSearch.getPullResults', 'active-search'], ['Search.rerender']])
})
