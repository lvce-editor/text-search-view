import type { SearchResult } from '../SearchResult/SearchResult.ts'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as ApplyCollapsedPaths from '../ApplyCollapsedPaths/ApplyCollapsedPaths.ts'
import * as TextSearchResultType from '../TextSearchResultType/TextSearchResultType.ts'

const getPaths = (items: readonly SearchResult[]): readonly string[] => {
  const paths: string[] = []
  for (const item of items) {
    if (item.type === TextSearchResultType.File) {
      paths.push(item.text)
    }
  }
  return paths
}

export const collapseAll = async (state: SearchState): Promise<SearchState> => {
  const { items, listFocusedIndex } = state
  if (items.length === 0) {
    return state
  }
  const paths = getPaths(items)
  return ApplyCollapsedPaths.applyCollapsedPaths(state, paths, listFocusedIndex)
}
