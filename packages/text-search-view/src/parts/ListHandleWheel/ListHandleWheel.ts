import { handleWheel as handleListWheel } from '@lvce-editor/list'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as GetFileIcons from '../GetFileIcons/GetFileIcons.ts'

export const handleWheel = async (state: SearchState, deltaMode: number, deltaY: number): Promise<SearchState> => {
  const { maxLineY: oldMaxLineY, minLineY: oldMinLineY } = state
  const newState = handleListWheel(state, deltaMode, deltaY)
  if (newState.minLineY === oldMinLineY && newState.maxLineY === oldMaxLineY) {
    return newState
  }
  const { fileIconCache, listItems, maxLineY, minLineY } = newState
  const visibleItems = listItems.slice(minLineY, maxLineY)
  const { icons, newFileIconCache } = await GetFileIcons.getFileIcons(visibleItems, fileIconCache)
  return {
    ...newState,
    fileIconCache: newFileIconCache,
    icons,
  }
}
