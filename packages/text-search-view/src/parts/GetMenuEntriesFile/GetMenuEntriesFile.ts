import { MenuItemFlags } from '@lvce-editor/constants'
import type { ContextMenuPropsList } from '../ContextMenuProps/ContextMenuProps.ts'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as GetFileUri from '../GetFileUri/GetFileUri.ts'
import { menuEntrySeparator } from '../MenuEntrySeparator/MenuEntrySeparator.ts'
import * as SearchStrings from '../SearchStrings/SearchStrings.ts'

export const getMenuEntriesFile = (state: SearchState, props: ContextMenuPropsList): readonly MenuEntry[] => {
  const uri = GetFileUri.getFileUri(state, props.index)
  return [
    {
      command: 'Search.replaceAll',
      flags: MenuItemFlags.None,
      id: 'replaceAll',
      label: SearchStrings.replaceAll(),
    },
    {
      command: 'Search.removeCurrent',
      flags: MenuItemFlags.None,
      id: 'dismiss',
      label: SearchStrings.dismiss(),
    },
    menuEntrySeparator,
    {
      command: 'Search.copy',
      flags: MenuItemFlags.None,
      id: 'copy',
      label: SearchStrings.copy(),
    },
    {
      command: 'Search.copyPath',
      flags: MenuItemFlags.None,
      id: 'copyPath',
      label: SearchStrings.copyPath(),
    },
    {
      command: 'Search.copyAll',
      flags: MenuItemFlags.None,
      id: 'copyAll',
      label: SearchStrings.copyAll(),
    },
    menuEntrySeparator,
    {
      args: [uri],
      command: 'Search.revealInExplorer',
      flags: MenuItemFlags.None,
      id: 'revealInExplorerView',
      label: SearchStrings.revealInExplorerView(),
    },
  ]
}
