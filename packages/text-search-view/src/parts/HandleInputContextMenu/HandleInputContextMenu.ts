import { MenuEntryId } from '@lvce-editor/constants'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as ContextMenu from '../ContextMenu/ContextMenu.ts'

export const handleInputContextMenu = async (state: SearchState, name: string, button: number, x: number, y: number): Promise<SearchState> => {
  const { uid } = state
  await ContextMenu.show2(uid, MenuEntryId.InputContextMenu, x, y, {
    inputName: name,
    menuId: MenuEntryId.InputContextMenu,
  })
  return state
}
