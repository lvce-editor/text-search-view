import { ClassNames } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetSearchDetailsToggleVirtualDom from '../GetSearchDetailsToggleVirtualDom/GetSearchDetailsToggleVirtualDom.ts'
import * as GetSearchMessageVirtualDom from '../GetSearchMessageVirtualDom/GetSearchMessageVirtualDom.ts'

const detailsNode: VirtualDomNode = {
  childCount: 2,
  className: ClassNames.SearchHeaderDetails,
  type: VirtualDomElements.Div,
}

export const getSearchHeaderDetailsCollapsedVirtualDom = (message: string): readonly VirtualDomNode[] => {
  return [
    detailsNode,
    ...GetSearchMessageVirtualDom.getSearchMessageVirtualDom(message, true),
    ...GetSearchDetailsToggleVirtualDom.getSearchDetailsToggleVirtualDom(),
  ]
}
