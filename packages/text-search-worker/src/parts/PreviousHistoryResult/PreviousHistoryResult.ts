import type { SearchState } from '../SearchState/SearchState.ts'

export const previousHistoryResult = async (state: SearchState): Promise<SearchState> => {
  return {
    ...state,
  }
}
