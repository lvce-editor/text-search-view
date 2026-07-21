import type { SearchState } from '../SearchState/SearchState.ts'

export const handleWorkspaceChange = (state: SearchState): SearchState => {
  return {
    ...state,
    deltaY: 0,
    items: [],
    listItems: [],
    matchCount: 0,
    maxLineY: 0,
    message: '',
    minLineY: 0,
    replacement: '',
    value: '',
  }
}
