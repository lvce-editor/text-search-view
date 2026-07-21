import { MenuEntryId } from '@lvce-editor/constants'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as ContextMenu from '../ContextMenu/ContextMenu.ts'
import * as GetListIndex from '../GetListIndex/GetListIndex.ts'
import * as SearchStates from '../SearchViewStates/SearchViewStates.ts'

export const handleContextMenuMouseAt = async (state: SearchState, eventX: number, eventY: number): Promise<SearchState> => {
  const { deltaY, headerHeight, itemHeight, listItems, uid, x, y } = state
  const index = GetListIndex.getListIndex(eventX, eventY, x, y, deltaY, itemHeight, headerHeight, listItems.length)
  const { newState, oldState } = SearchStates.get(uid)
  SearchStates.set(uid, oldState, {
    ...newState,
    focusedIndex: index,
    listFocusedIndex: index,
  })
  await ContextMenu.show2(uid, MenuEntryId.Search, eventX, eventY, {
    index,
    menuId: MenuEntryId.Search,
  })
  return state
}
