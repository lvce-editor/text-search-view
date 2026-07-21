import { ClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as InputName from '../InputName/InputName.ts'
import * as SearchStrings from '../SearchStrings/SearchStrings.ts'

const closeIcon: VirtualDomNode = {
  childCount: 0,
  className: ClassNames.CloseMaskIcon,
  type: VirtualDomElements.Div,
}

export const getSearchRemoveVirtualDom = (): readonly VirtualDomNode[] => {
  const title = SearchStrings.remove()
  const dom: VirtualDomNode[] = [
    {
      childCount: 1,
      className: ClassNames.SearchRemove,
      name: InputName.Remove,
      title,
      type: VirtualDomElements.Button,
    },
    closeIcon,
  ]
  return dom
}
