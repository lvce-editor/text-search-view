import type { SearchState } from '../SearchState/SearchState.ts'

export const isEqual = (oldState: SearchState, newState: SearchState): boolean => {
  return (
    oldState.deltaY === newState.deltaY &&
    oldState.finalDeltaY === newState.finalDeltaY &&
    oldState.height === newState.height &&
    oldState.headerHeight === newState.headerHeight &&
    oldState.itemHeight === newState.itemHeight &&
    oldState.items === newState.items
  )
}
