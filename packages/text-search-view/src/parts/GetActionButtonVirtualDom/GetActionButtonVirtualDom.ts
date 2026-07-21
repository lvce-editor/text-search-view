import { ClassNames, mergeClassNames } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Action } from '../Action/Action.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetIconVirtualDom from '../GetIconVirtualDom/GetIconVirtualDom.ts'

const getClassName = (enabled: boolean | undefined): string => {
  if (enabled) {
    return ClassNames.IconButton
  }
  return mergeClassNames(ClassNames.IconButton, ClassNames.IconButtonDisabled)
}

export const getActionButtonVirtualDom = (action: Action): readonly VirtualDomNode[] => {
  const { enabled, icon, id, label } = action
  const className = getClassName(enabled)
  return [
    {
      childCount: 1,
      className,
      name: id,
      title: label,
      type: VirtualDomElements.Button,
    },
    GetIconVirtualDom.getIconVirtualDom(icon),
  ]
}
