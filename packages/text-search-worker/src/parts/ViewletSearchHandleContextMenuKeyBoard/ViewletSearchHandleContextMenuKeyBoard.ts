import { MenuEntryId } from '@lvce-editor/constants'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as ContextMenu from '../ContextMenu/ContextMenu.ts'

export const handleContextMenuKeyboard = async (state: SearchState): Promise<SearchState> => {
  const { uid, x, y } = state // TODO
  await ContextMenu.show2(uid, MenuEntryId.Search, x, y, {
    index: 0, // TODO pass proper index
    menuId: MenuEntryId.Search,
  })
  return state
}
