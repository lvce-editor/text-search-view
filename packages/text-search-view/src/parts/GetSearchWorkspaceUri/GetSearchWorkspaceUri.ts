import type { SearchState } from '../SearchState/SearchState.ts'

export const getSearchWorkspaceUri = (state: SearchState): string => {
  const { searchRootUri, workspaceUri } = state
  return searchRootUri || workspaceUri
}
