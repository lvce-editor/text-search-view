import type { SearchState } from '../SearchState/SearchState.ts'
import type { SelectionState } from '../SelectionState/SelectionState.ts'

export const handleInputSelectionChange = async (
  state: SearchState,
  name: string,
  selectionStart: number,
  selectionEnd: number,
): Promise<SearchState> => {
  const { selections } = state
  const old = selections[name as keyof SelectionState]
  if (!old) {
    return state
  }
  const { end, start } = old
  if (start === selectionStart && end === selectionEnd) {
    return state
  }
  return {
    ...state,
    selections: {
      ...selections,
      [name]: {
        end: selectionEnd,
        start: selectionStart,
      },
    },
  }
}
