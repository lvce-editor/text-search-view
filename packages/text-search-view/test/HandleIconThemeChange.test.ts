import { expect, test } from '@jest/globals'
import { IconThemeWorker } from '@lvce-editor/rpc-registry'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleIconThemeChange from '../src/parts/HandleIconThemeChange/HandleIconThemeChange.ts'

test('handleIconThemeChange updates icons for visible items', async () => {
  using mockRpc = IconThemeWorker.registerMockRpc({
    'IconTheme.getIcons': () => ['icon1', 'icon1'],
  })
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    items: [
      { end: 0, lineNumber: 0, start: 0, text: 'file1.txt', type: 1 },
      { end: 0, lineNumber: 0, start: 0, text: 'file2.txt', type: 1 },
      { end: 0, lineNumber: 0, start: 0, text: 'file3.txt', type: 1 },
    ],
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
