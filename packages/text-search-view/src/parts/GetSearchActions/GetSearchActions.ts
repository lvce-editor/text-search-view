import type { Action } from '../Action/Action.ts'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as ActionType from '../ActionType/ActionType.ts'
import * as InputName from '../InputName/InputName.ts'
import * as MaskIcon from '../MaskIcon/MaskIcon.ts'
import * as SearchStrings from '../SearchStrings/SearchStrings.ts'
import * as ViewMode from '../ViewMode/ViewMode.ts'

export const getActions = (state: SearchState): readonly Action[] => {
  const { items, replacement, value, viewMode } = state
  const hasSearchPattern = value !== ''
  const hasSearchResults = items.length > 0
  const canClear = hasSearchResults || hasSearchPattern || replacement !== ''
  const viewAction =
    viewMode === ViewMode.Tree
      ? {
          command: '',
          enabled: true,
          icon: MaskIcon.ListTree,
          id: InputName.ViewAsList,
          label: SearchStrings.viewAsList(),
          type: ActionType.Button,
        }
      : {
          command: '',
          enabled: true,
          icon: MaskIcon.ListFlat,
          id: InputName.ViewAsTree,
          label: SearchStrings.viewAsTree(),
          type: ActionType.Button,
        }
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
    viewAction,
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
