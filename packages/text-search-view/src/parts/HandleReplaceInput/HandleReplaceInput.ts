import type { SearchState } from '../SearchState/SearchState.ts'
import * as HandleUpdate from '../HandleUpdate/HandleUpdate.ts'
import * as InputSource from '../InputSource/InputSource.ts'

export const handleReplaceInput = (state: SearchState, value: string, inputSource = InputSource.Script): Promise<SearchState> => {
  return HandleUpdate.handleUpdate(state, {
    inputSource,
    replacement: value,
  })
}
