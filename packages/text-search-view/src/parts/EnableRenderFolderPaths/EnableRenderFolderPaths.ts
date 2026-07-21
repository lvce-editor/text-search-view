import type { SearchState } from '../SearchState/SearchState.ts'

export const enableRenderFolderPaths = (state: SearchState): SearchState => {
  return {
    ...state,
    renderFolderPaths: true,
  }
}
