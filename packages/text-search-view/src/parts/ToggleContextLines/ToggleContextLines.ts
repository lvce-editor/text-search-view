import type { SearchState } from '../SearchState/SearchState.ts'

export const toggleContextLines = async (state: SearchState): Promise<SearchState> => {
  const { contextLinesEnabled } = state
  return {
    ...state,
    contextLinesEnabled: !contextLinesEnabled,
  }
}
