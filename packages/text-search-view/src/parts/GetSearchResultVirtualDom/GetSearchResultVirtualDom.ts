import { AriaRoles } from '@lvce-editor/constants'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { DisplaySearchResult } from '../DisplaySearchResult/DisplaySearchResult.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetAriaExpanded from '../GetAriaExpanded/GetAriaExpanded.ts'
import * as GetBadgeVirtualDom from '../GetBadgeVirtualDom/GetBadgeVirtualDom.ts'
import * as GetChevronVirtualDom from '../GetChevronVirtualDom/GetChevronVirtualDom.ts'
import * as GetIconsVirtualDom from '../GetIconsVirtualDom/GetIconsVirtualDom.ts'
import * as GetLabelVirtualDom from '../GetLabelVirtualDom/GetLabelVirtualDom.ts'
import { getChildCount } from '../GetSearchDisplayResultChildCount/GetSearchDisplayResultChildCount.ts'
import * as GetSearchRemoveVirtualDom from '../GetSearchRemoveVirtualDom/GetSearchRemoveVirtualDom.ts'
import * as GetSearchResultClassName from '../GetSearchResultClassName/GetSearchResultClassName.ts'
import * as TreeItemPadding from '../TreeItemPadding/TreeItemPadding.ts'

export const getSearchResultVirtualDom = (rowInfo: DisplaySearchResult): readonly VirtualDomNode[] => {
  const {
    badgeText,
    depth,
    expanded,
    focused,
    icon,
    indent,
    matchLength,
    matchStart,
    posInSet,
    replacement,
    setSize,
    text: displayText,
    title,
  } = rowInfo
  const className = `${GetSearchResultClassName.getSearchResultClassName(focused)} Indent-${indent} IndentRight-${TreeItemPadding.PaddingRight}`
  const childCount = getChildCount(icon, expanded, badgeText)
  const dom: VirtualDomNode[] = [
    {
      ariaExpanded: GetAriaExpanded.getAriaExpanded(expanded),
      ariaLabel: title,
      ariaLevel: depth,
      ariaPosInSet: posInSet,
      ariaSetSize: setSize,
      childCount,
      className,
      role: AriaRoles.TreeItem,
      title,
      type: VirtualDomElements.Div,
    },
    ...GetChevronVirtualDom.getChevronVirtualDom(expanded),
    ...GetIconsVirtualDom.getIconsVirtualDom(icon),
    ...GetLabelVirtualDom.getLabelVirtualDom(displayText, matchLength, matchStart, replacement),
    ...GetBadgeVirtualDom.getBadgeVirtualDom(badgeText),
    ...GetSearchRemoveVirtualDom.getSearchRemoveVirtualDom(),
  ]
  return dom
}
