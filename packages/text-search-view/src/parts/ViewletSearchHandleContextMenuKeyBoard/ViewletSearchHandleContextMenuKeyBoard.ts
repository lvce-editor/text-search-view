import { MenuEntryId } from '@lvce-editor/constants'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as ContextMenu from '../ContextMenu/ContextMenu.ts'

export const handleContextMenuKeyboard = async (state: SearchState): Promise<SearchState> => {
  const { focusedIndex, listFocusedIndex, uid, x, y } = state
  const index = focusedIndex === -1 ? listFocusedIndex : focusedIndex
  await ContextMenu.show2(uid, MenuEntryId.Search, x, y, {
    index,
    menuId: MenuEntryId.Search,
  })
  return state
}
