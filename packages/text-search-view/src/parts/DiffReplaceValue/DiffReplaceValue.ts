import type { SearchState } from '../SearchState/SearchState.ts'
import * as DiffType from '../DiffType/DiffType.ts'
import * as InputSource from '../InputSource/InputSource.ts'

export const diffType = DiffType.RenderReplaceValue

export const isEqual = (oldState: SearchState, newState: SearchState): boolean => {
  return oldState.replacement === newState.replacement || newState.inputSource === InputSource.User
}
