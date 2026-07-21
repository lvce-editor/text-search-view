import type { SearchState } from '../SearchState/SearchState.ts'

export const disableRenderFolderPaths = (state: SearchState): SearchState => {
  return {
    ...state,
    renderFolderPaths: false,
  }
}
