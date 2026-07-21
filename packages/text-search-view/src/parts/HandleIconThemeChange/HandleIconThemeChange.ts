import type { SearchState } from '../SearchState/SearchState.ts'
import * as GetFileIcons from '../GetFileIcons/GetFileIcons.ts'

export const handleIconThemeChange = async (state: SearchState): Promise<SearchState> => {
  const { items, maxLineY, minLineY } = state
  const visibleItems = items.slice(minLineY, maxLineY)
  const { icons, newFileIconCache } = await GetFileIcons.getFileIcons(visibleItems, {})
  return {
    ...state,
    fileIconCache: newFileIconCache,
    icons,
  }
}
