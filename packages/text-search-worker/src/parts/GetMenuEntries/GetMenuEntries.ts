import { MenuEntryId } from '@lvce-editor/constants'
import type { ContextMenuProps } from '../ContextMenuProps/ContextMenuProps.ts'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import type { SearchState } from '../SearchState/SearchState.ts'
import { getMenuEntriesInput } from '../GetMenuEntriesInput/GetMenuEntriesInput.ts'
import { getMenuEntriesList } from '../GetMenuEntriesList/GetMenuEntriesList.ts'

export const getMenuEntries = (state: SearchState, props: ContextMenuProps): readonly MenuEntry[] => {
  switch (props.menuId) {
    case MenuEntryId.InputContextMenu:
      return getMenuEntriesInput(props)
    case MenuEntryId.Search:
      return getMenuEntriesList(state, props)
    default:
      return []
  }
}
