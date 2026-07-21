import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ChevronVirtualDom from '../ChevronVirtualDom/ChevronVirtualDom.ts'
import * as ExpandedType from '../ExpandedType/ExpandedType.ts'

export const getChevronVirtualDom = (expanded: number): readonly VirtualDomNode[] => {
  switch (expanded) {
    case ExpandedType.Collapsed:
      return [ChevronVirtualDom.chevronRightVirtualDom]
    case ExpandedType.Expanded:
      return [ChevronVirtualDom.chevronDownVirtualDom]
    default:
      return []
  }
}
