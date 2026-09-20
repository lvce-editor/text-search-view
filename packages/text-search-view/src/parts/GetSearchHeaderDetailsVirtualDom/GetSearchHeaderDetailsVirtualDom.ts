import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetSearchHeaderDetailsCollapsedVirtualDom from '../GetSearchHeaderDetailsCollapsedVirtualDom/GetSearchHeaderDetailsCollapsedVirtualDom.ts'
import * as GetSearchHeaderDetailsExpandedVirtualDom from '../GetSearchHeaderDetailsExpandedVirtualDom/GetSearchHeaderDetailsExpandedVirtualDom.ts'
import { DetailsExpanded } from '../SearchFlags/SearchFlags.ts'

export const getSearchHeaderDetailsVirtualDom = (
  flags: number,
  message: string,
  matchCount = 0,
  showOpenInEditorLink = true,
): readonly VirtualDomNode[] => {
  if (flags & DetailsExpanded) {
    return GetSearchHeaderDetailsExpandedVirtualDom.getSearchHeaderDetailsExpandedVirtualDom(flags, message, matchCount, showOpenInEditorLink)
  }
  return GetSearchHeaderDetailsCollapsedVirtualDom.getSearchHeaderDetailsCollapsedVirtualDom(message, matchCount, showOpenInEditorLink)
}
