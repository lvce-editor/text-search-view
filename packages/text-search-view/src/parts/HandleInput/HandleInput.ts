import type { SearchState } from '../SearchState/SearchState.ts'
import * as HandleUpdate from '../HandleUpdate/HandleUpdate.ts'
import * as InputSource from '../InputSource/InputSource.ts'

export const handleInput = (state: SearchState, value: string, inputSource = InputSource.Script): Promise<SearchState> => {
  const { historyIndex: currentHistoryIndex } = state
  const historyIndex = inputSource === InputSource.User ? -1 : currentHistoryIndex
  return HandleUpdate.handleUpdate(state, { historyIndex, inputSource, value })
}
