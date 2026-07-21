import { AriaRoles } from '@lvce-editor/constants'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import { getSearchMessageClassName } from '../GetSearchMessageClassName/GetSearchMessageClassName.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getSearchMessageVirtualDom = (message: string, indented: boolean): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 1,
      className: getSearchMessageClassName(indented),
      role: AriaRoles.Status,
      type: VirtualDomElements.Div,
    },
    text(message),
  ]
}
