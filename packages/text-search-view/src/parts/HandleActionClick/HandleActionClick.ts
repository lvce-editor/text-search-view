import type { SearchState } from '../SearchState/SearchState.ts'
import { clearSearchResults } from '../ClearSearchResults/ClearSearchResults.ts'
import { collapseAll } from '../CollapseAll/CollapseAll.ts'
import * as InputName from '../InputName/InputName.ts'
import { openSearchEditor } from '../OpenSearchEditor/OpenSearchEditor.ts'
import { refresh } from '../Refresh/Refresh.ts'
import { viewAsTree } from '../ViewAsTree/ViewAsTree.ts'

export const handleActionClick = async (state: SearchState, name: string): Promise<SearchState> => {
  switch (name) {
    case InputName.ClearAll:
      return clearSearchResults(state)
    case InputName.CollapseAll:
      return collapseAll(state)
    case InputName.OpenSearchEditor:
      return openSearchEditor(state)
    case InputName.Refresh:
      return refresh(state)
    case InputName.ViewAsTree:
      return viewAsTree(state)
    default:
      return state
  }
}
