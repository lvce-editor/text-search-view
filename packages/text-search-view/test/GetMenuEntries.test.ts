import { expect, test } from '@jest/globals'
import { MenuEntryId, MenuItemFlags, TextSearchResultType } from '@lvce-editor/constants'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { getMenuEntries } from '../src/parts/GetMenuEntries/GetMenuEntries.ts'
import { menuEntrySeparator } from '../src/parts/MenuEntrySeparator/MenuEntrySeparator.ts'

const file = {
  end: 0,
  lineNumber: 0,
  start: 0,
  text: './src/file.ts',
  type: TextSearchResultType.File,
}

const match = {
  end: 5,
  lineNumber: 1,
  start: 0,
  text: 'match',
  type: TextSearchResultType.Match,
}

test('returns grouped file menu entries including reveal in explorer', () => {
  const state = {
    ...createDefaultState(),
    items: [file],
    workspacePath: '/workspace',
  }
  const entries = getMenuEntries(state, { index: 0, menuId: MenuEntryId.Search })

  expect(entries).toEqual([
    {
      command: 'Search.replaceAll',
      flags: MenuItemFlags.None,
      id: 'replaceAll',
      label: 'Replace All',
    },
    {
      command: 'Search.removeCurrent',
      flags: MenuItemFlags.None,
      id: 'dismiss',
      label: 'Dismiss',
    },
    menuEntrySeparator,
    {
      command: 'Search.copy',
      flags: MenuItemFlags.None,
      id: 'copy',
      label: 'Copy',
    },
    {
      command: 'Search.copyPath',
      flags: MenuItemFlags.None,
      id: 'copyPath',
      label: 'Copy Path',
    },
    {
      command: 'Search.copyAll',
      flags: MenuItemFlags.None,
      id: 'copyAll',
      label: 'Copy All',
    },
    menuEntrySeparator,
    {
      args: ['/workspace/src/file.ts'],
      command: 'RevealInExplorer.reveal',
      flags: MenuItemFlags.None,
      id: 'revealInExplorerView',
      label: 'Reveal in Explorer View',
    },
  ])
})

test('returns grouped match menu entries that reveal the containing file', () => {
  const state = {
    ...createDefaultState(),
    items: [file, match],
    workspacePath: 'memfs://workspace',
  }
  const entries = getMenuEntries(state, { index: 1, menuId: MenuEntryId.Search })

  expect(entries).toEqual([
    {
      command: 'Search.removeCurrent',
      flags: MenuItemFlags.None,
      id: 'dismiss',
      label: 'Dismiss',
    },
    menuEntrySeparator,
    {
      command: 'Search.copy',
      flags: MenuItemFlags.None,
      id: 'copy',
      label: 'Copy',
    },
    {
      command: 'Search.copyAll',
      flags: MenuItemFlags.None,
      id: 'copyAll',
      label: 'Copy All',
    },
    menuEntrySeparator,
    {
      args: ['memfs://workspace/src/file.ts'],
      command: 'RevealInExplorer.reveal',
      flags: MenuItemFlags.None,
      id: 'revealInExplorerView',
      label: 'Reveal in Explorer View',
    },
  ])
})
