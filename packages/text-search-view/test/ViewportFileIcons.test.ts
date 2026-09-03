import { expect, test } from '@jest/globals'
import { IconThemeWorker } from '@lvce-editor/rpc-registry'
import type { SearchResult } from '../src/parts/SearchResult/SearchResult.ts'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as ListFocusIndex from '../src/parts/ListFocusIndex/ListFocusIndex.ts'
import * as ListHandleScrollBarClick from '../src/parts/ListHandleScrollBarClick/ListHandleScrollBarClick.ts'
import * as ListHandleScrollBarMove from '../src/parts/ListHandleScrollBarMove/ListHandleScrollBarMove.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

const createFile = (index: number): SearchResult => ({
  end: 0,
  lineNumber: index,
  start: 0,
  text: `file-${index}.css`,
  type: TextSearchResultType.File,
})

const createState = (): SearchState => {
  const items = Array.from({ length: 100 }, (_value, index) => createFile(index))
  return {
    ...CreateDefaultState.createDefaultState(),
    finalDeltaY: 2134,
    headerHeight: 0,
    height: 66,
    icons: ['file-0-icon', 'file-1-icon', 'file-2-icon', 'file-3-icon'],
    itemHeight: 22,
    items,
    listItems: items,
    maxLineY: 4,
    minLineY: 0,
    scrollBarHeight: 20,
    y: 0,
  }
}

const lastIcons = ['file-97-icon', 'file-98-icon', 'file-99-icon']

const assertLastIconRequest = (invocations: readonly unknown[]): void => {
  expect(invocations).toEqual([
    [
      'IconTheme.getIcons',
      [
        { name: 'file-97.css', type: 1 },
        { name: 'file-98.css', type: 1 },
        { name: 'file-99.css', type: 1 },
      ],
    ],
  ])
}

test('scrollbar click requests icons for the new visible range', async () => {
  using mockRpc = IconThemeWorker.registerMockRpc({
    'IconTheme.getIcons': () => lastIcons,
  })
  const state = createState()

  const result = await ListHandleScrollBarClick.handleScrollBarClick(state, 66)

  expect(result.minLineY).toBe(97)
  expect(result.maxLineY).toBe(100)
  expect(result.icons).toEqual(lastIcons)
  expect(result.items).toBe(state.items)
  assertLastIconRequest(mockRpc.invocations)
})

test('scrollbar drag requests icons for the new visible range', async () => {
  using mockRpc = IconThemeWorker.registerMockRpc({
    'IconTheme.getIcons': () => lastIcons,
  })
  const state = createState()

  const result = await ListHandleScrollBarMove.handleScrollBarMove(state, 46)

  expect(result.minLineY).toBe(97)
  expect(result.maxLineY).toBe(100)
  expect(result.icons).toEqual(lastIcons)
  assertLastIconRequest(mockRpc.invocations)
})

test('keyboard navigation requests icons for the new visible range', async () => {
  using mockRpc = IconThemeWorker.registerMockRpc({
    'IconTheme.getIcons': () => lastIcons,
  })
  const state = createState()

  const result = await ListFocusIndex.focusIndex(state, 99)

  expect(result.focusedIndex).toBe(99)
  expect(result.minLineY).toBe(97)
  expect(result.maxLineY).toBe(100)
  expect(result.icons).toEqual(lastIcons)
  assertLastIconRequest(mockRpc.invocations)
})

test('keyboard navigation reuses cached icons', async () => {
  using mockRpc = IconThemeWorker.registerMockRpc({})
  const state = {
    ...createState(),
    fileIconCache: {
      'file-97.css': 'file-97-icon',
      'file-98.css': 'file-98-icon',
      'file-99.css': 'file-99-icon',
    },
  }

  const result = await ListFocusIndex.focusIndex(state, 99)

  expect(result.icons).toEqual(lastIcons)
  expect(result.fileIconCache).toBe(state.fileIconCache)
  expect(mockRpc.invocations).toEqual([])
})

test('navigation uses filtered list items for its bounds', async () => {
  using mockRpc = IconThemeWorker.registerMockRpc({})
  const state = createState()
  const filteredItems = state.listItems.slice(0, 2)
  const filteredState: SearchState = {
    ...state,
    fileIconCache: {
      'file-0.css': 'file-0-icon',
      'file-1.css': 'file-1-icon',
    },
    listItems: filteredItems,
    maxLineY: 2,
  }

  const result = await ListFocusIndex.focusIndex(filteredState, 1)

  expect(result.focusedIndex).toBe(1)
  expect(result.maxLineY).toBe(2)
  expect(result.items).toBe(state.items)
  expect(result.listItems).toBe(filteredItems)
  expect(mockRpc.invocations).toEqual([])
})
