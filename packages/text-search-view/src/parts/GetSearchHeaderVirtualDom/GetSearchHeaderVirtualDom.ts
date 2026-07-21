import { AriaRoles } from '@lvce-editor/constants'
import { ClassNames } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetSearchHeaderDetailsVirtualDom from '../GetSearchHeaderDetailsVirtualDom/GetSearchHeaderDetailsVirtualDom.ts'
import { getSearchHeaderLimitHitVirtualDom } from '../GetSearchHeaderLimitHitWarningDom/GetSearchHeaderLimitHitWarningDom.ts'
import * as GetSearchHeaderTopVirtualDom from '../GetSearchHeaderTopVirtualDom/GetSearchHeaderTopVirtualDom.ts'

export const getSearchHeaderVirtualDom = (
  flags: number,
  message: string,
  searchInputErrorMessage: string,
  matchCount: number,
  focus: number,
  limitHitWarning: string,
): readonly VirtualDomNode[] => {
  const warningDom = getSearchHeaderLimitHitVirtualDom(limitHitWarning)
  const parentNode: VirtualDomNode = {
    childCount: 2 + (warningDom.length > 0 ? 1 : 0),
    className: ClassNames.SearchHeader,
    onContextMenu: DomEventListenerFunctions.HandleHeaderContextMenu,
    role: AriaRoles.None,
    type: VirtualDomElements.Div,
  }
  const dom: readonly VirtualDomNode[] = [
    parentNode,
    ...GetSearchHeaderTopVirtualDom.getSearchHeaderTopVirtualDom(flags, searchInputErrorMessage, matchCount, focus),
    ...GetSearchHeaderDetailsVirtualDom.getSearchHeaderDetailsVirtualDom(flags, message),
    ...warningDom,
  ]
  return dom
}
