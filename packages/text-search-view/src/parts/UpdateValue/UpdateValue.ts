import { InputSource } from '@lvce-editor/constants'
import type { SearchState } from '../SearchState/SearchState.ts'
import { getNewSelections } from '../GetNewSelections/GetNewSelections.ts'
import * as InputName from '../InputName/InputName.ts'

export const updateValue = (state: SearchState, name: string, newValue: string): SearchState => {
  const { selections } = state
  const newSelections = getNewSelections(selections, name, newValue)
  switch (name) {
    case InputName.FilesToExclude:
      return {
        ...state,
        excludeValue: newValue,
        inputSource: InputSource.Script,
        selections: newSelections,
      }
    case InputName.FilesToInclude:
      return {
        ...state,
        includeValue: newValue,
        inputSource: InputSource.Script,
        selections: newSelections,
      }
    case InputName.ReplaceValue:
      return {
        ...state,
        inputSource: InputSource.Script,
        replacement: newValue,
        selections: newSelections,
      }
    case InputName.SearchValue:
      return {
        ...state,
        inputSource: InputSource.Script,
        selections: newSelections,
        value: newValue,
      }
    default:
      return state
  }
}
