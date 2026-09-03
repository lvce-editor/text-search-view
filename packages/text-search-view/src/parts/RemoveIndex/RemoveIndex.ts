import type { SearchState } from '../SearchState/SearchState.ts'
import { getNewMinMax } from '../GetNewMinMax/GetNewMinMax.ts'
import * as GetSearchMessageLayout from '../GetSearchMessageLayout/GetSearchMessageLayout.ts'
import { removeItemFromItems } from '../RemoveItemFromItems/RemoveItemFromItems.ts'
import * as ScrollBarFunctions from '../ScrollBarFunctions/ScrollBarFunctions.ts'
import * as ViewletSearchStatusMessage from '../SearchStatusMessage/SearchStatusMessage.ts'
import * as UpdateVisibleFileIcons from '../UpdateVisibleFileIcons/UpdateVisibleFileIcons.ts'

export const removeIndex = async (state: SearchState, index: number): Promise<SearchState> => {
  const { deltaY, fileCount, height, itemHeight, items, matchCount, maxLineY, minimumSliderSize, minLineY } = state
  if (index === -1) {
    return state
  }
  const { newFileCount, newFocusedIndex, newItems, newMatchCount } = removeItemFromItems(items, index, matchCount, fileCount)
  const message = ViewletSearchStatusMessage.getStatusMessage(newMatchCount, newFileCount)
  const { headerHeight, messageHeight } = await GetSearchMessageLayout.getSearchMessageLayout(state, message)
  const { newDeltaY, newMaxLineY, newMinLineY } = getNewMinMax(newItems.length, minLineY, maxLineY, deltaY, itemHeight)
  const total = newItems.length
  const contentHeight = total * itemHeight
  const listHeight = height - headerHeight
  const scrollBarHeight = ScrollBarFunctions.getScrollBarSize(height, contentHeight, minimumSliderSize)
  const finalDeltaY = Math.max(contentHeight - listHeight, 0)
  const updatedState = {
    ...state,
    deltaY: newDeltaY,
    fileCount: newFileCount,
    finalDeltaY,
    headerHeight,
    items: newItems,
    listFocusedIndex: newFocusedIndex,
    listItems: newItems,
    matchCount: newMatchCount,
    maxLineY: newMaxLineY,
    message,
    messageHeight,
    minLineY: newMinLineY,
    scrollBarHeight,
  }
  return UpdateVisibleFileIcons.updateVisibleFileIcons(updatedState)
}
