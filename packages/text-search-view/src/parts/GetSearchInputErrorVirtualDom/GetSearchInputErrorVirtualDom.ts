import { AriaRoles } from '@lvce-editor/constants'
import { ClassNames } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const errorNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.SearchInputError,
  role: AriaRoles.Alert,
  type: VirtualDomElements.Div,
}

export const getSearchInputErrorVirtualDom = (errorMessage: string): readonly VirtualDomNode[] => {
  if (!errorMessage) {
    return []
  }
  return [errorNode, text(errorMessage)]
}
