import type { SearchState } from '../SearchState/SearchState.ts'
import * as HandleUpdate from '../HandleUpdate/HandleUpdate.ts'
import * as InputSource from '../InputSource/InputSource.ts'

export const handleInput = (state: SearchState, value: string, inputSource = InputSource.Script): Promise<SearchState> => {
  const historyIndex = inputSource === InputSource.User ? -1 : state.historyIndex
  return HandleUpdate.handleUpdate(state, { historyIndex, inputSource, value })
}
