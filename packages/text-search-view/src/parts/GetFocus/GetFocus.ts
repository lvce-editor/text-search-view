import * as SearchViewStates from '../SearchViewStates/SearchViewStates.ts'

export const getFocus = (uid: number): number => {
  const { newState } = SearchViewStates.get(uid)
  return newState.focus
}
