import { MenuItemFlags } from '@lvce-editor/constants'
import type { ContextMenuProps } from '../ContextMenuProps/ContextMenuProps.ts'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as SearchStrings from '../SearchStrings/SearchStrings.ts'

export const getMenuEntriesMatch = (state: SearchState, props: ContextMenuProps): readonly MenuEntry[] => {
  return [
    {
      command: 'Search.removeCurrent',
      flags: MenuItemFlags.None,
      id: 'dismiss',
      label: SearchStrings.dismiss(),
    },
    {
      command: 'Search.copy',
      flags: MenuItemFlags.None,
      id: 'copy',
      label: SearchStrings.copy(),
    },
    {
      command: 'Search.copyAll',
      flags: MenuItemFlags.None,
      id: 'copyAll',
      label: SearchStrings.copyAll(),
    },
  ]
}
