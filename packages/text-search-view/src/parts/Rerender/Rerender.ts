import type { SearchState } from '../SearchState/SearchState.ts'

export const rerender = (state: SearchState): SearchState => {
  return { ...state }
}
