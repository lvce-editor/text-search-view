import type { SearchState } from '../SearchState/SearchState.ts'
import * as GetFileIcons from '../GetFileIcons/GetFileIcons.ts'
import { getNewMinMax } from '../GetNewMinMax/GetNewMinMax.ts'
import { removeItemFromItems } from '../RemoveItemFromItems/RemoveItemFromItems.ts'
import * as ScrollBarFunctions from '../ScrollBarFunctions/ScrollBarFunctions.ts'
import * as ViewletSearchStatusMessage from '../SearchStatusMessage/SearchStatusMessage.ts'

export const removeIndex = async (state: SearchState, index: number): Promise<SearchState> => {
  const { deltaY, fileCount, fileIconCache, headerHeight, height, itemHeight, items, matchCount, maxLineY, minimumSliderSize, minLineY } = state
  if (index === -1) {
    return state
  }
  const { newFileCount, newFocusedIndex, newItems, newMatchCount } = removeItemFromItems(items, index, matchCount, fileCount)
  const message = ViewletSearchStatusMessage.getStatusMessage(newMatchCount, newFileCount)
  const { newDeltaY, newMaxLineY, newMinLineY } = getNewMinMax(newItems.length, minLineY, maxLineY, deltaY, itemHeight)
  const total = newItems.length
  const contentHeight = total * itemHeight
  const listHeight = height - headerHeight
  const scrollBarHeight = ScrollBarFunctions.getScrollBarSize(height, contentHeight, minimumSliderSize)
  const finalDeltaY = Math.max(contentHeight - listHeight, 0)
  const visible = newItems.slice(0, maxLineY)
  const { icons, newFileIconCache } = await GetFileIcons.getFileIcons(visible, fileIconCache)

  return {
    ...state,
    deltaY: newDeltaY,
    fileCount: newFileCount,
    fileIconCache: newFileIconCache,
    finalDeltaY,
    icons,
    items: newItems,
    listFocusedIndex: newFocusedIndex,
    listItems: newItems,
    matchCount: newMatchCount,
    maxLineY: newMaxLineY,
    message,
    minLineY: newMinLineY,
    scrollBarHeight,
  }
}
