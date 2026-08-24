import type { Action } from '../Action/Action.ts'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as ActionType from '../ActionType/ActionType.ts'
import * as InputName from '../InputName/InputName.ts'
import * as MaskIcon from '../MaskIcon/MaskIcon.ts'
import * as SearchStrings from '../SearchStrings/SearchStrings.ts'

export const getActions = (state: SearchState): readonly Action[] => {
  const { items, replacement, value } = state
  const hasSearchPattern = value !== ''
  const hasSearchResults = items.length > 0
  const canClear = hasSearchResults || hasSearchPattern || replacement !== ''
  return [
    {
      command: 'refresh',
      enabled: hasSearchPattern,
      icon: MaskIcon.Refresh,
      id: InputName.Refresh,
      label: SearchStrings.refresh(),
      type: ActionType.Button,
    },
    {
      command: 'clearSearchResults',
      enabled: canClear,
      icon: MaskIcon.ClearAll,
      id: InputName.ClearAll,
      label: SearchStrings.clearSearchResults(),
      type: ActionType.Button,
    },
    {
      command: '',
      enabled: true,
      icon: MaskIcon.NewFile,
      id: InputName.OpenSearchEditor,
      label: SearchStrings.openNewSearchEditor(),
      type: ActionType.Button,
    },
    {
      command: '',
      enabled: hasSearchResults,
      icon: MaskIcon.ListFlat,
      id: InputName.ViewAsTree,
      label: SearchStrings.viewAsTree(),
      type: ActionType.Button,
    },
    {
      command: '',
      enabled: hasSearchResults,
      icon: MaskIcon.CollapseAll,
      id: InputName.CollapseAll,
      label: SearchStrings.collapseAll(),
      type: ActionType.Button,
    },
  ]
}
