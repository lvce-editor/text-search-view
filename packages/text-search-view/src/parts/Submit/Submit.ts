import type { SearchState } from '../SearchState/SearchState.ts'
import * as ViewletSearchHandleUpdate from '../HandleUpdate/HandleUpdate.ts'
import * as InputSource from '../InputSource/InputSource.ts'

const getNewHistory = (history: readonly string[], newValue: string): readonly string[] => {
  const newHistory = [...history, newValue]
  const maxHistoryLength = 100
  const cutHistory = newHistory.slice(0, maxHistoryLength)
  return cutHistory
}

export const submit = (state: SearchState): Promise<SearchState> => {
  const { history, value } = state
  const newHistory = getNewHistory(history, value)
  return ViewletSearchHandleUpdate.handleUpdate(state, {
    history: newHistory,
    inputSource: InputSource.User,
    value,
  })
}
