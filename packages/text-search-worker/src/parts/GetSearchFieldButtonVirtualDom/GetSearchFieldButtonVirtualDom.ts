import { ClassNames } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { InputAction } from '../InputAction/InputAction.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetAriaChecked from '../GetAriaChecked/GetAriaChecked.ts'
import * as GetDisabled from '../GetDisabled/GetDisabled.ts'
import * as GetRole from '../GetRole/GetRole.ts'
import * as GetSearchFieldButtonClassName from '../GetSearchFieldButtonClassName/GetSearchFieldButtonClassName.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import * as TabIndex from '../TabIndex/TabIndex.ts'

export const getSearchFieldButtonVirtualDom = (button: InputAction): readonly VirtualDomNode[] => {
  const { flag, icon, name, title } = button
  const ariaChecked = GetAriaChecked.getAriaChecked(flag)
  const role = GetRole.getRole(flag)
  const disabled = GetDisabled.getDisabled(flag)
  return [
    {
      ariaChecked,
      childCount: 1,
      className: GetSearchFieldButtonClassName.getSearchFieldButtonClassName(flag),
      disabled,
      name,
      onClick: DomEventListenerFunctions.HandleButtonClick,
      role,
      tabIndex: TabIndex.Focusable,
      title,
      type: VirtualDomElements.Button,
    },
    {
      childCount: 0,
      className: MergeClassNames.mergeClassNames(ClassNames.MaskIcon, icon),
      type: VirtualDomElements.Span,
    },
  ]
}
