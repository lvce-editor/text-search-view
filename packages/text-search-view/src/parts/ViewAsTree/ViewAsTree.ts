import type { SearchState } from '../SearchState/SearchState.ts'
import * as GetNumberOfVisibleItems from '../GetNumberOfVisibleItems/GetNumberOfVisibleItems.ts'
import * as GetTreeListItems from '../GetTreeListItems/GetTreeListItems.ts'
import * as ScrollBarFunctions from '../ScrollBarFunctions/ScrollBarFunctions.ts'
import * as UpdateVisibleFileIcons from '../UpdateVisibleFileIcons/UpdateVisibleFileIcons.ts'
import * as ViewMode from '../ViewMode/ViewMode.ts'

export const viewAsTree = async (state: SearchState): Promise<SearchState> => {
  const { headerHeight, height, itemHeight, items, minimumSliderSize } = state
  if (items.length === 0) {
    return state
  }
  const listItems = GetTreeListItems.getTreeListItems(items)
  const total = listItems.length
  const contentHeight = total * itemHeight
  const listHeight = height - headerHeight
  const finalDeltaY = Math.max(contentHeight - listHeight, 0)
  const numberOfVisible = GetNumberOfVisibleItems.getNumberOfVisibleItems(listHeight, itemHeight)
  const maxLineY = Math.min(numberOfVisible, total)
  const scrollBarHeight = ScrollBarFunctions.getScrollBarSize(height, contentHeight, minimumSliderSize)
  const updatedState = {
    ...state,
    collapsedPaths: [],
    deltaY: 0,
    finalDeltaY,
    listItems,
    maxLineY,
    minLineY: 0,
    scrollBarHeight,
    viewMode: ViewMode.Tree,
  }
  return UpdateVisibleFileIcons.updateVisibleFileIcons(updatedState)
}
