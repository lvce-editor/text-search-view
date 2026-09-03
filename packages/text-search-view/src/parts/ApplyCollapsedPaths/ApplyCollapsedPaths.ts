import { WhenExpression } from '@lvce-editor/virtual-dom-worker'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as Clamp from '../Clamp/Clamp.ts'
import * as GetFilteredResults from '../GetFilteredResults/GetFilteredResults.ts'
import * as GetNumberOfVisibleItems from '../GetNumberOfVisibleItems/GetNumberOfVisibleItems.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import * as ScrollBarFunctions from '../ScrollBarFunctions/ScrollBarFunctions.ts'
import * as UpdateVisibleFileIcons from '../UpdateVisibleFileIcons/UpdateVisibleFileIcons.ts'

export const applyCollapsedPaths = async (state: SearchState, collapsedPaths: readonly string[], listFocusedIndex: number): Promise<SearchState> => {
  const { deltaY: oldDeltaY, headerHeight, height, itemHeight, items, minimumSliderSize } = state
  const filteredResults = GetFilteredResults.getFilteredResults(items, collapsedPaths)
  const total = filteredResults.length
  const listHeight = height - headerHeight
  const contentHeight = total * itemHeight
  const finalDeltaY = Math.max(contentHeight - listHeight, 0)
  const deltaY = Clamp.clamp(oldDeltaY, 0, finalDeltaY)
  const minLineY = Math.floor(deltaY / itemHeight)
  const numberOfVisible = GetNumberOfVisibleItems.getNumberOfVisibleItems(listHeight, itemHeight)
  const maxLineY = Math.min(minLineY + numberOfVisible, total)
  const scrollBarHeight = ScrollBarFunctions.getScrollBarSize(height, contentHeight, minimumSliderSize)
  const scrollBarY = finalDeltaY === 0 ? 0 : ScrollBarFunctions.getScrollBarY(deltaY, finalDeltaY, listHeight, scrollBarHeight)
  const updatedState = {
    ...state,
    collapsedPaths,
    deltaY,
    finalDeltaY,
    focus: WhenExpression.FocusSearchResults,
    focusSource: InputSource.Script,
    listFocused: true,
    listFocusedIndex,
    listItems: filteredResults,
    maxLineY,
    minLineY,
    scrollBarHeight,
    scrollBarY,
  }
  return UpdateVisibleFileIcons.updateVisibleFileIcons(updatedState)
}
