import type { SearchResult } from '../SearchResult/SearchResult.ts'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as ApplyCollapsedPaths from '../ApplyCollapsedPaths/ApplyCollapsedPaths.ts'
import * as ToggleCollapsedPath from '../ToggleCollapsedPath/ToggleCollapsedPath.ts'

export const selectIndexFile = async (state: SearchState, searchResult: SearchResult, index: number): Promise<SearchState> => {
  const { collapsedPaths } = state
  const path = searchResult.text
  const newCollapsedPaths = ToggleCollapsedPath.toggleCollapsedPath(collapsedPaths, path)
  return ApplyCollapsedPaths.applyCollapsedPaths(state, newCollapsedPaths, index)
}
