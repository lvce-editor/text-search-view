import { expect, test } from '@jest/globals'
import { IconThemeWorker } from '@lvce-editor/rpc-registry'
import { collapseAll } from '../src/parts/CollapseAll/CollapseAll.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'
import { viewAsList } from '../src/parts/ViewAsList/ViewAsList.ts'
import { viewAsTree } from '../src/parts/ViewAsTree/ViewAsTree.ts'
import * as ViewMode from '../src/parts/ViewMode/ViewMode.ts'

test('viewAsTree leaves empty results unchanged', async () => {
  const state = createDefaultState()

  expect(await viewAsTree(state)).toBe(state)
})

test('viewAsTree displays search results as a folder tree', async () => {
  using mockRpc = IconThemeWorker.registerMockRpc({
    'IconTheme.getIcons': () => ['folder-icon', 'folder-icon', 'file-icon'],
  })
  const items = [
    { end: 0, lineNumber: 0, start: 0, text: './src/nested/file.ts', type: TextSearchResultType.File },
    { end: 6, lineNumber: 1, start: 0, text: 'needle', type: TextSearchResultType.Match },
  ]
  const state = {
    ...createDefaultState(),
    headerHeight: 20,
    height: 130,
    items,
    listItems: items,
    workspaceUri: 'file:///workspace',
  }

  const result = await viewAsTree(state)

  expect(result).toMatchObject({
    collapsedPaths: [],
    deltaY: 0,
    finalDeltaY: 0,
    maxLineY: 4,
    minLineY: 0,
    viewMode: ViewMode.Tree,
  })
  expect(result.listItems.map(({ depth, isDirectory, text }) => ({ depth, isDirectory, text }))).toEqual([
    { depth: 0, isDirectory: true, text: 'src' },
    { depth: 1, isDirectory: true, text: 'src/nested' },
    { depth: 2, isDirectory: undefined, text: 'src/nested/file.ts' },
    { depth: 3, isDirectory: undefined, text: 'needle' },
  ])
  expect(result.icons).toEqual(['folder-icon', 'folder-icon', 'file-icon', ''])
  expect(mockRpc.invocations).toEqual([
    [
      'IconTheme.getIcons',
      [
        {
          name: 'src',
          type: 2,
        },
        {
          name: 'nested',
          type: 2,
        },
        {
          name: 'file.ts',
          type: 1,
        },
      ],
    ],
  ])

  const collapsed = await collapseAll(result)
  expect(collapsed.listItems.map((item) => item.text)).toEqual(['src'])

  const list = await viewAsList(collapsed)
  expect(list).toMatchObject({
    collapsedPaths: [],
    deltaY: 0,
    finalDeltaY: 0,
    maxLineY: 2,
    minLineY: 0,
    viewMode: ViewMode.List,
  })
  expect(list.listItems.map(({ depth, text }) => ({ depth, text }))).toEqual([
    { depth: undefined, text: './src/nested/file.ts' },
    { depth: undefined, text: 'needle' },
  ])
})
