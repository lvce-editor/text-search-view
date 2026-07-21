import type { SearchState } from '../SearchState/SearchState.ts'
import type { SelectionState } from '../SelectionState/SelectionState.ts'
import { readText } from '../ClipBoard/ClipBoard.ts'
import { getCurrentValue } from '../GetCurrentValue/GetCurrentValue.ts'
import { getNewText } from '../GetNewText/GetNewText.ts'
import { updateValue } from '../UpdateValue/UpdateValue.ts'

export const isSelectionKey = (name: string, selections: SelectionState): name is keyof SelectionState => {
  return name in selections
}

export const handleInputPaste = async (state: SearchState, name: string): Promise<SearchState> => {
  const { selections } = state
  if (!isSelectionKey(name, selections)) {
    return state
  }
  const selection = selections[name]
  const { end, start } = selection
  const currentText = getCurrentValue(state, name)
  const insertedText = await readText()
  const newText = getNewText(currentText, start, end, insertedText)
  return updateValue(state, name, newText)
}

export { getCurrentValue } from '../GetCurrentValue/GetCurrentValue.ts'

export { updateValue } from '../UpdateValue/UpdateValue.ts'
