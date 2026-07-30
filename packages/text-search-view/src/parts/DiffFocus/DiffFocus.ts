import type { SearchState } from '../SearchState/SearchState.ts'
import * as InputSource from '../InputSource/InputSource.ts'

export const isEqual = (oldState: SearchState, newState: SearchState): boolean => {
  return oldState.focus === newState.focus || newState.focusSource === InputSource.User
}
