import { test, expect } from '@jest/globals'
import { IconThemeWorker } from '@lvce-editor/rpc-registry'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import { collapseAll } from '../src/parts/CollapseAll/CollapseAll.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

test('collapseAll returns the same state', async () => {
  const state = {
    ...CreateDefaultState.createDefaultState(),
    assetDir: '/assets',
    height: 100,
    itemHeight: 22,
    platform: 1,
    uid: 42,
    value: 'test',
    width: 100,
    workspacePath: '/workspace',
  }

  const result = await collapseAll(state)

  expect(result).toBe(state)
})

test('collapseAll with different state', async () => {
  const state = {
    ...CreateDefaultState.createDefaultState(),
    assetDir: '/assets',
    height: 150,
    itemHeight: 30,
    platform: 2,
    replacement: 'replace',
    uid: 123,
    value: 'another test',
    width: 200,
    workspacePath: '/workspace',
  }

  const result = await collapseAll(state)

  expect(result).toBe(state)
})

test('collapseAll updates list items and file icons', async () => {
  using mockRpc = IconThemeWorker.registerMockRpc({
    'IconTheme.getIcons': () => ['file-1-icon', 'file-2-icon'],
  })
  const items = [
    { end: 0, lineNumber: 0, start: 0, text: 'file1.txt', type: TextSearchResultType.File },
    { end: 4, lineNumber: 1, start: 0, text: 'match1', type: TextSearchResultType.Match },
    { end: 0, lineNumber: 2, start: 0, text: 'file2.js', type: TextSearchResultType.File },
    { end: 4, lineNumber: 3, start: 0, text: 'match2', type: TextSearchResultType.Match },
  ]
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    headerHeight: 40,
    height: 500,
    itemHeight: 22,
    items,
    listItems: items,
  }

  const result = await collapseAll(state)

  expect(result).toMatchObject({
    collapsedPaths: ['file1.txt', 'file2.js'],
    focus: 22,
    focusSource: 2,
    icons: ['file-1-icon', 'file-2-icon'],
    listFocused: true,
    listFocusedIndex: -1,
    listItems: [
      { end: 0, lineNumber: 0, start: 0, text: 'file1.txt', type: TextSearchResultType.File },
      { end: 0, lineNumber: 2, start: 0, text: 'file2.js', type: TextSearchResultType.File },
    ],
    maxLineY: 2,
  })
  expect(mockRpc.invocations).toEqual([
    [
      'IconTheme.getIcons',
      [
        { name: 'file1.txt', type: 1 },
        { name: 'file2.js', type: 1 },
      ],
    ],
  ])
})
