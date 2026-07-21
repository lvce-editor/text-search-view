import type { SearchState } from '../SearchState/SearchState.ts'
import { writeText } from '../ClipBoard/ClipBoard.ts'
import { getCurrentValue, isSelectionKey } from '../HandleInputPaste/HandleInputPaste.ts'

export const handleInputCopy = async (state: SearchState, name: string): Promise<SearchState> => {
  const { selections } = state
  if (!isSelectionKey(name, selections)) {
    return state
  }
  const selection = selections[name]
  const { end, start } = selection
  const currentText = getCurrentValue(state, name)
  const toCopy = currentText.slice(start, end)
  await writeText(toCopy)
  return state
}
