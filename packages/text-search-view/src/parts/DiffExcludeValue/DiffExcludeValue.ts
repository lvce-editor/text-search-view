import type { SearchState } from '../SearchState/SearchState.ts'
import * as DiffType from '../DiffType/DiffType.ts'
import * as InputSource from '../InputSource/InputSource.ts'

export const diffType = DiffType.RenderExcludeValue

export const isEqual = (oldState: SearchState, newState: SearchState): boolean => {
  return oldState.excludeValue === newState.excludeValue || newState.inputSource === InputSource.User
}
