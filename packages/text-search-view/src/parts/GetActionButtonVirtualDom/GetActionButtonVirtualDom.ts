import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Action } from '../Action/Action.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetActionButtonClassName from '../GetActionButtonClassName/GetActionButtonClassName.ts'
import * as GetIconVirtualDom from '../GetIconVirtualDom/GetIconVirtualDom.ts'

export const getActionButtonVirtualDom = (action: Action): readonly VirtualDomNode[] => {
  const { enabled, icon, id, label } = action
  const className = GetActionButtonClassName.getActionButtonClassName(enabled)
  const disabled = !enabled
  return [
    {
      childCount: 1,
      className,
      disabled,
      name: id,
      title: label,
      type: VirtualDomElements.Button,
    },
    GetIconVirtualDom.getIconVirtualDom(icon),
  ]
}
