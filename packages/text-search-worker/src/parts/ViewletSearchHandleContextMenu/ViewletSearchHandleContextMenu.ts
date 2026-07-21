import type { SearchState } from '../SearchState/SearchState.ts'
import { getContextMenuHandler } from '../GetContextMenuHandler/GetContextMenuHandler.ts'

export const handleContextMenu = async (state: SearchState, button: number, x: number, y: number): Promise<SearchState> => {
  const fn = getContextMenuHandler(button)
  const newState = await fn(state, x, y)
  return newState
}
