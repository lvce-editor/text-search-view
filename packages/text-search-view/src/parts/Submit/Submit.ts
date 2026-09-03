import type { SearchState } from '../SearchState/SearchState.ts'
import * as GetNewHistory from '../GetNewHistory/GetNewHistory.ts'
import * as ViewletSearchHandleUpdate from '../HandleUpdate/HandleUpdate.ts'
import * as InputSource from '../InputSource/InputSource.ts'

export const submit = (state: SearchState): Promise<SearchState> => {
  const { history, value } = state
  const newHistory = GetNewHistory.getNewHistory(history, value)
  return ViewletSearchHandleUpdate.handleUpdate(state, {
    history: newHistory,
    inputSource: InputSource.User,
    value,
  })
}
