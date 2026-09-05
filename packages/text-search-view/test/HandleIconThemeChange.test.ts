import { expect, test } from '@jest/globals'
import { IconThemeWorker } from '@lvce-editor/rpc-registry'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleIconThemeChange from '../src/parts/HandleIconThemeChange/HandleIconThemeChange.ts'

test('handleIconThemeChange updates icons for visible items', async () => {
  using mockRpc = IconThemeWorker.registerMockRpc({
    'IconTheme.getIcons': () => ['icon1', 'icon1'],
  })
  const items = [
    { end: 0, lineNumber: 0, start: 0, text: 'file1.txt', type: 1 },
    { end: 0, lineNumber: 0, start: 0, text: 'file2.txt', type: 1 },
    { end: 0, lineNumber: 0, start: 0, text: 'file3.txt', type: 1 },
  ]
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    items,
    listItems: items,
    maxLineY: 2,
    minLineY: 0,
  }
  const newState = await HandleIconThemeChange.handleIconThemeChange(state)
  expect(newState).not.toBe(state)
  expect(newState.icons).toEqual(['icon1', 'icon1'])
  expect(mockRpc.invocations).toEqual([
    [
      'IconTheme.getIcons',
      [
        { name: 'file1.txt', type: 1 },
        { name: 'file2.txt', type: 1 },
      ],
    ],
  ])
})

test('handleIconThemeChange handles empty items array', async () => {
  using mockRpc = IconThemeWorker.registerMockRpc({
    'IconTheme.getIcons': () => [],
  })
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    items: [],
    maxLineY: 0,
    minLineY: 0,
  }
  const newState = await HandleIconThemeChange.handleIconThemeChange(state)
  expect(newState).not.toBe(state)
  expect(newState.icons).toEqual([])
  expect(mockRpc.invocations).toEqual([])
})

test('handleIconThemeChange requests icons for visible filtered items', async () => {
  using mockRpc = IconThemeWorker.registerMockRpc({
    'IconTheme.getIcons': () => ['file2-icon'],
  })
  const file1 = { end: 0, lineNumber: 0, start: 0, text: 'file1.txt', type: 1 }
  const match1 = { end: 1, lineNumber: 1, start: 0, text: 'match1', type: 2 }
  const file2 = { end: 0, lineNumber: 0, start: 0, text: 'file2.txt', type: 1 }
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    fileIconCache: { 'file1.txt': 'old-icon', 'file2.txt': 'old-icon' },
    items: [file1, match1, file2],
    listItems: [file1, file2],
    maxLineY: 2,
    minLineY: 1,
  }

  const newState = await HandleIconThemeChange.handleIconThemeChange(state)

  expect(newState.icons).toEqual(['file2-icon'])
  expect(newState.fileIconCache).toEqual({ 'file2.txt': 'file2-icon' })
  expect(mockRpc.invocations).toEqual([['IconTheme.getIcons', [{ name: 'file2.txt', type: 1 }]]])
})
