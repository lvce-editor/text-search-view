import type { SearchState } from '../SearchState/SearchState.ts'

export const isEqual = (oldState: SearchState, newState: SearchState): boolean => {
  return oldState.selections === newState.selections
}
