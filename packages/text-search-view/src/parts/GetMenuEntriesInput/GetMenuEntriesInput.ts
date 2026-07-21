import { MenuItemFlags } from '@lvce-editor/constants'
import type { ContextMenuPropsInput } from '../ContextMenuProps/ContextMenuProps.ts'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import { menuEntrySeparator } from '../MenuEntrySeparator/MenuEntrySeparator.ts'
import * as SearchStrings from '../SearchStrings/SearchStrings.ts'

export const getMenuEntriesInput = (options: ContextMenuPropsInput): readonly MenuEntry[] => {
  const { inputName } = options
  if (!inputName) {
    return []
  }
  return [
    {
      args: [inputName],
      command: 'Search.handleInputCut',
      flags: MenuItemFlags.None,
      id: 'cut',
      label: SearchStrings.cut(),
    },
    {
      args: [inputName],
      command: 'Search.handleInputCopy',
      flags: MenuItemFlags.None,
      id: 'copy',
      label: SearchStrings.copy(),
    },
    {
      args: [inputName],
      command: 'Search.handleInputPaste',
      flags: MenuItemFlags.None,
      id: 'paste',
      label: SearchStrings.paste(),
    },
    menuEntrySeparator,
    {
      args: [inputName],
      command: 'Search.handleInputSelectAll',
      flags: MenuItemFlags.None,
      id: 'selectAll',
      label: SearchStrings.selectAll(),
    },
  ]
}
