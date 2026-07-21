import type { SearchState } from '../SearchState/SearchState.ts'

export const replaceAllInFile = async (state: SearchState): Promise<SearchState> => {
  // TODO replace occurrance  for focused file
  return {
    ...state,
  }
}
