import type { SelectionState } from '../SelectionState/SelectionState.ts'

export const getNewSelections = (selections: SelectionState, name: string, newValue: string): SelectionState => {
  const old = selections[name as keyof SelectionState]
  if (!old) {
    return selections
  }
  const { end, start } = old
  const newSelection = newValue.length
  if (start === newSelection && end === newSelection) {
    return selections
  }
  return {
    ...selections,
    [name]: {
      end: newSelection,
      start: newSelection,
    },
  }
}
