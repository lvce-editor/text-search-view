import type { SearchState } from '../SearchState/SearchState.ts'
import * as Clamp from '../Clamp/Clamp.ts'
import * as GetFileIcons from '../GetFileIcons/GetFileIcons.ts'
import * as GetNumberOfVisibleItems from '../GetNumberOfVisibleItems/GetNumberOfVisibleItems.ts'
import * as GetSearchMessageHeight from '../GetSearchMessageHeight/GetSearchMessageHeight.ts'
import * as ScrollBarFunctions from '../ScrollBarFunctions/ScrollBarFunctions.ts'

export const handleResize = async (state: SearchState, x: number, y: number, width: number, height: number): Promise<SearchState> => {
  const {
    deltaY,
    fileIconCache,
    flags,
    headerHeight: oldHeaderHeight,
    itemHeight,
    listItems,
    message,
    messageHeight: oldMessageHeight,
    minimumSliderSize,
  } = state
  const messageHeight = await GetSearchMessageHeight.getSearchMessageHeight(message, width, flags)
  const headerHeight = oldHeaderHeight + messageHeight - oldMessageHeight
  const total = listItems.length
  const contentHeight = total * itemHeight
  const listHeight = height - headerHeight
  const scrollBarHeight = ScrollBarFunctions.getScrollBarSize(height, contentHeight, minimumSliderSize)
  const finalDeltaY = Math.max(contentHeight - listHeight, 0)
  const newDeltaY = Clamp.clamp(deltaY, 0, finalDeltaY)
  const minLineY = Math.floor(newDeltaY / itemHeight)
  const numberOfVisible = GetNumberOfVisibleItems.getNumberOfVisibleItems(listHeight, itemHeight)
  const maxLineY = Math.min(minLineY + numberOfVisible, total)
  const visibleItems = listItems.slice(minLineY, maxLineY)
  const { icons, newFileIconCache } = await GetFileIcons.getFileIcons(visibleItems, fileIconCache)
  const scrollBarY = finalDeltaY === 0 ? 0 : ScrollBarFunctions.getScrollBarY(newDeltaY, finalDeltaY, listHeight, scrollBarHeight)
  return {
    ...state,
    deltaY: newDeltaY,
    fileIconCache: newFileIconCache,
    finalDeltaY,
    headerHeight,
    height,
    icons,
    maxLineY,
    messageHeight,
    minLineY,
    scrollBarHeight,
    scrollBarY,
    width,
    x,
    y,
  }
}
