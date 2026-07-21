import type { SearchState } from '../SearchState/SearchState.ts'
import { getNextHistoryData } from '../GetNextHistoryData/GetNextHistoryData.ts'
import * as HandleUpdate from '../HandleUpdate/HandleUpdate.ts'
import * as InputSource from '../InputSource/InputSource.ts'

export const nextHistoryResult = async (state: SearchState): Promise<SearchState> => {
  const { history, historyIndex, value } = state
  const { newHistoryIndex, newValue } = getNextHistoryData(history, historyIndex)
  if (newValue === value) {
    return state
  }

  return HandleUpdate.handleUpdate(state, {
    historyIndex: newHistoryIndex,
    inputSource: InputSource.Script,
    value: newValue,
  })
}
