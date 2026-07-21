import type { SearchState } from '../SearchState/SearchState.ts'

export const handleUpdateValidationError = (state: SearchState, update: Partial<SearchState>, searchInputErrorMessage: string): SearchState => {
  const partialNewState = { ...state, ...update }
  return {
    ...partialNewState,
    searchInputErrorMessage: searchInputErrorMessage,
  }
}
