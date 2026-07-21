import { WhenExpression } from '@lvce-editor/virtual-dom-worker'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as GetFileIcons from '../GetFileIcons/GetFileIcons.ts'
import * as GetFilteredResults from '../GetFilteredResults/GetFilteredResults.ts'
import * as GetNumberOfVisibleItems from '../GetNumberOfVisibleItems/GetNumberOfVisibleItems.ts'
import * as InputSource from '../InputSource/InputSource.ts'

export const applyCollapsedPaths = async (state: SearchState, collapsedPaths: readonly string[], listFocusedIndex: number): Promise<SearchState> => {
  const { fileIconCache, headerHeight, height, itemHeight, items } = state
  const filteredResults = GetFilteredResults.getFilteredResults(items, collapsedPaths)
  const { icons, newFileIconCache } = await GetFileIcons.getFileIcons(filteredResults, fileIconCache)
  const total = filteredResults.length
  const listHeight = height - headerHeight
  const numberOfVisible = GetNumberOfVisibleItems.getNumberOfVisibleItems(listHeight, itemHeight)
  const maxLineY = Math.min(numberOfVisible, total)
  return {
    ...state,
    collapsedPaths,
    fileIconCache: newFileIconCache,
    focus: WhenExpression.FocusSearchResults,
    focusSource: InputSource.Script,
    icons,
    listFocused: true,
    listFocusedIndex,
    listItems: filteredResults,
    maxLineY,
  }
}
