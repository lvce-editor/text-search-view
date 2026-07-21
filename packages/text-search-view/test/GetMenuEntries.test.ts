import { expect, test } from '@jest/globals'
import { MenuEntryId, MenuItemFlags } from '@lvce-editor/constants'
import type { ContextMenuProps } from '../src/parts/ContextMenuProps/ContextMenuProps.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { getMenuEntries } from '../src/parts/GetMenuEntries/GetMenuEntries.ts'
import * as SearchStrings from '../src/parts/SearchStrings/SearchStrings.ts'

test.skip('getMenuEntries returns menu entries with correct structure', () => {
  const state = createDefaultState()
  const params: ContextMenuProps = {
    index: 0,
    menuId: MenuEntryId.Search,
  }
  const entries = getMenuEntries(state, params)
  expect(entries).toHaveLength(5)
  expect(entries[0]).toEqual({
    command: 'Search.replaceAll',
    flags: MenuItemFlags.None,
    id: 'replaceAll',
    label: SearchStrings.replaceAll(),
  })
  expect(entries[1]).toEqual({
    command: 'Search.removeCurrent',
    flags: MenuItemFlags.None,
    id: 'dismiss',
    label: SearchStrings.dismiss(),
  })
  expect(entries[2]).toEqual({
    command: 'Search.copy',
    flags: MenuItemFlags.None,
    id: 'copy',
    label: SearchStrings.copy(),
  })
  expect(entries[3]).toEqual({
    command: 'Search.copyPath',
    flags: MenuItemFlags.None,
    id: 'copyPath',
    label: SearchStrings.copyPath(),
  })
  expect(entries[4]).toEqual({
    command: 'Search.copyAll',
    flags: MenuItemFlags.None,
    id: 'copyAll',
    label: SearchStrings.copyAll(),
  })
})
