import type { SearchState } from '../SearchState/SearchState.ts'
import { writeText } from '../ClipBoard/ClipBoard.ts'
import { getNewTextCut } from '../GetNewTextCut/GetNewTextCut.ts'
import { getCurrentValue, isSelectionKey, updateValue } from '../HandleInputPaste/HandleInputPaste.ts'

export const handleInputCut = async (state: SearchState, name: string): Promise<SearchState> => {
  const { selections } = state
  if (!isSelectionKey(name, selections)) {
    return state
  }
  const selection = selections[name]
  const { end, start } = selection
  const currentText = getCurrentValue(state, name)
  const { cutText, newText } = getNewTextCut(currentText, start, end)
  await writeText(cutText)
  return updateValue(state, name, newText)
}
