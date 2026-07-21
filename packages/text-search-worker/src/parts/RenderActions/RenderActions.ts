import type { SearchState } from '../SearchState/SearchState.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetActionsVirtualDom from '../GetActionsVirtualDom/GetActionsVirtualDom.ts'
import * as GetSearchActions from '../GetSearchActions/GetSearchActions.ts'

export const renderActions = (state: SearchState): readonly VirtualDomNode[] => {
  const actions = GetSearchActions.getActions(state)
  const dom = GetActionsVirtualDom.getActionsVirtualDom(actions)
  return dom
}
