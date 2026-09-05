import type { SearchState } from '../SearchState/SearchState.ts'
import * as NormalizeWorkspaceUri from '../NormalizeWorkspaceUri/NormalizeWorkspaceUri.ts'
import * as SearchMessageHeight from '../SearchMessageHeight/SearchMessageHeight.ts'

export const handleWorkspaceChange = (state: SearchState, workspaceUri: string): SearchState => {
  const { headerHeight: oldHeaderHeight, messageHeight: oldMessageHeight } = state
  const headerHeight = oldHeaderHeight + SearchMessageHeight.Minimum - oldMessageHeight
  return {
    ...state,
    deltaY: 0,
    headerHeight,
    items: [],
    listItems: [],
    matchCount: 0,
    maxLineY: 0,
    message: '',
    messageHeight: SearchMessageHeight.Minimum,
    minLineY: 0,
    replacement: '',
    value: '',
    workspaceUri: NormalizeWorkspaceUri.normalizeWorkspaceUri(workspaceUri),
  }
}
