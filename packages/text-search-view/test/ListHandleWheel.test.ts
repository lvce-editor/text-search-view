import { expect, test } from '@jest/globals'
import { IconThemeWorker } from '@lvce-editor/rpc-registry'
import type { SearchResult } from '../src/parts/SearchResult/SearchResult.ts'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleWheel } from '../src/parts/ListHandleWheel/ListHandleWheel.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

const createItem = (text: string, type: number): SearchResult => ({
  end: 0,
  lineNumber: 0,
  start: 0,
  text,
  type,
})

test('handleWheel updates file icons when the visible range changes', async () => {
  using mockRpc = IconThemeWorker.registerMockRpc({
    'IconTheme.getIcons': () => ['file-1-icon'],
  })
  const items = [
    createItem('./file-0.css', TextSearchResultType.File),
    createItem('match-0', TextSearchResultType.Match),
    createItem('./file-1.css', TextSearchResultType.File),
    createItem('match-1', TextSearchResultType.Match),
  ]
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    fileIconCache: {
      'file-0.css': 'file-0-icon',
    },
    finalDeltaY: 22,
    headerHeight: 0,
    height: 44,
    icons: ['file-0-icon', '', ''],
    itemHeight: 22,
    items,
    listItems: items,
    maxLineY: 3,
  }

  const result = await handleWheel(state, 0, 22)

  expect(result.minLineY).toBe(1)
  expect(result.maxLineY).toBe(4)
  expect(result.icons).toEqual(['', 'file-1-icon', ''])
  expect(result.fileIconCache).toEqual({
    'file-0.css': 'file-0-icon',
    'file-1.css': 'file-1-icon',
  })
  expect(mockRpc.invocations).toEqual([['IconTheme.getIcons', [{ name: 'file-1.css', type: 1 }]]])
})

test('handleWheel preserves file icons while scrolling within the same visible range', async () => {
  using mockRpc = IconThemeWorker.registerMockRpc({})
  const items = [createItem('./file.css', TextSearchResultType.File), createItem('match', TextSearchResultType.Match)]
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    finalDeltaY: 22,
    headerHeight: 0,
    height: 44,
    icons: ['file-icon', ''],
    itemHeight: 22,
    items,
    listItems: items,
    maxLineY: 2,
  }

  const result = await handleWheel(state, 0, 1)

  expect(result.icons).toBe(state.icons)
  expect(mockRpc.invocations).toEqual([])
})
