import type { SearchState } from '../SearchState/SearchState.ts'
import { getPreviousHistoryData } from '../GetPreviousHistoryData/GetPreviousHistoryData.ts'
import * as HandleUpdate from '../HandleUpdate/HandleUpdate.ts'
import * as InputSource from '../InputSource/InputSource.ts'

export const previousHistoryResult = async (state: SearchState): Promise<SearchState> => {
  const { history, historyIndex, value } = state
  if (history.length === 0) {
    return state
  }
  const { newHistoryIndex, newValue } = getPreviousHistoryData(history, historyIndex)
  if (newValue === value) {
    if (newHistoryIndex === historyIndex) {
      return state
    }
    return {
      ...state,
      historyIndex: newHistoryIndex,
      inputSource: InputSource.Script,
    }
  }
  const update = {
    historyIndex: newHistoryIndex,
    inputSource: InputSource.Script,
    value: newValue,
  }
  return HandleUpdate.handleUpdate(state, update)
}
