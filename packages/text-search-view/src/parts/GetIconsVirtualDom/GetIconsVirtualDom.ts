import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetFileIconVirtualDom from '../GetFileIconVirtualDom/GetFileIconVirtualDom.ts'

export const getIconsVirtualDom = (icon: string): readonly VirtualDomNode[] => {
  if (icon) {
    return [GetFileIconVirtualDom.getFileIconVirtualDom(icon)]
  }
  return []
}
