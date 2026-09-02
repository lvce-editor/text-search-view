import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import { SearchWarningMessage } from '../ClassNames/ClassNames.ts'

const messageNode: VirtualDomNode = {
  childCount: 1,
  className: SearchWarningMessage,
  type: VirtualDomElements.Div,
}

export const getSearchHeaderLimitHitVirtualDom = (limitHitWarning: string): readonly VirtualDomNode[] => {
  if (!limitHitWarning) {
    return []
  }
  const dom: readonly VirtualDomNode[] = [
    messageNode,
    // TODO warning triangle here
    text(limitHitWarning),
  ]
  return dom
}
