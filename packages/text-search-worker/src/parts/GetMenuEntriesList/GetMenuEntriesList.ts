import { TextSearchResultType } from '@lvce-editor/constants'
import type { ContextMenuPropsList } from '../ContextMenuProps/ContextMenuProps.ts'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import type { SearchState } from '../SearchState/SearchState.ts'
import { getMenuEntriesFile } from '../GetMenuEntriesFile/GetMenuEntriesFile.ts'
import { getMenuEntriesMatch } from '../GetMenuEntriesMatch/GetMenuEntriesMatch.ts'

export const getMenuEntriesList = (state: SearchState, props: ContextMenuPropsList): readonly MenuEntry[] => {
  const { items } = state
  const { index } = props
  const item = items[index]
  if (!item) {
    return []
  }
  if (item.type === TextSearchResultType.Match) {
    return getMenuEntriesMatch(state, props)
  }
  if (item.type === TextSearchResultType.File) {
    return getMenuEntriesFile(state, props)
  }
  return []
}
