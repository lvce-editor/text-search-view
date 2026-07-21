import { ViewletCommand } from '@lvce-editor/constants'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as InputName from '../InputName/InputName.ts'

export const renderValue = (oldState: SearchState, newState: SearchState): readonly any[] => {
  return [ViewletCommand.SetValueByName, InputName.SearchValue, newState.value]
}

export const renderReplacement = (oldState: SearchState, newState: SearchState): readonly any[] => {
  return [ViewletCommand.SetValueByName, InputName.ReplaceValue, newState.replacement]
}

export const renderIncludeValue = (oldState: SearchState, newState: SearchState): readonly any[] => {
  return [ViewletCommand.SetValueByName, InputName.FilesToInclude, newState.includeValue]
}

export const renderExcludeValue = (oldState: SearchState, newState: SearchState): readonly any[] => {
  return [ViewletCommand.SetValueByName, InputName.FilesToExclude, newState.excludeValue]
}
