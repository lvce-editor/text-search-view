import * as SearchViewStates from '../SearchViewStates/SearchViewStates.ts'

export const getFlags = (uid: number): number => {
  const { newState } = SearchViewStates.get(uid)
  return newState.flags
}
