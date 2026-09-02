import type { SearchState } from '../SearchState/SearchState.ts'
import * as GetTopHeight from '../GetTopHeight/GetTopHeight.ts'
import * as SearchMessageHeight from '../SearchMessageHeight/SearchMessageHeight.ts'

export const handleUpdateEmpty = (state: SearchState, update: Partial<SearchState>): SearchState => {
  const partialNewState = { ...state, ...update }
  const headerHeight = GetTopHeight.getTopHeight(partialNewState.flags)
  return {
    ...partialNewState,
    collapsedPaths: [],
    deltaY: 0,
    fileCount: 0,
    finalDeltaY: 0,
    headerHeight,
    icons: [],
    items: [],
    limitHit: false,
    limitHitWarning: '',
    listItems: [],
    loaded: true,
    matchCount: 0,
    maxLineY: 0,
    message: '',
    messageHeight: SearchMessageHeight.Minimum,
    minLineY: 0,
    scrollBarHeight: 0,
    scrollBarY: 0,
    searchId: '',
    searchInputErrorMessage: '',
  }
}
