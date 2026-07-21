import type { SearchState } from '../SearchState/SearchState.ts'

export const handleListBlur = (state: SearchState): SearchState => {
  return {
    ...state,
    listFocused: false,
  }
}
