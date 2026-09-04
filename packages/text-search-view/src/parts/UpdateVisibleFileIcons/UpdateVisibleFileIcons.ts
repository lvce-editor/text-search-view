import type { FileIconCache } from '../FileIconCache/FileIconCache.ts'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as GetFileIcons from '../GetFileIcons/GetFileIcons.ts'

export const updateVisibleFileIcons = async (state: SearchState, fileIconCache?: FileIconCache): Promise<SearchState> => {
  const { fileIconCache: currentFileIconCache, listItems, maxLineY, minLineY } = state
  const visibleItems = listItems.slice(minLineY, maxLineY)
  const { icons, newFileIconCache } = await GetFileIcons.getFileIcons(visibleItems, fileIconCache ?? currentFileIconCache)
  return {
    ...state,
    fileIconCache: newFileIconCache,
    icons,
  }
}

export const updateVisibleFileIconsWhenRangeChanges = async (oldState: SearchState, newState: SearchState): Promise<SearchState> => {
  if (oldState.listItems === newState.listItems && oldState.minLineY === newState.minLineY && oldState.maxLineY === newState.maxLineY) {
    return newState
  }
  return updateVisibleFileIcons(newState)
}
