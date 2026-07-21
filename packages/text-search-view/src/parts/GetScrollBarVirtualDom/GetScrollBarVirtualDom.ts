import { AriaRoles } from '@lvce-editor/constants'
import { ClassNames } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as DomId from '../DomId/DomId.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'

export const getScrollBarVirtualDom = (scrollBarHeight: number, scrollBarY: number, scrollBarValue: number): readonly VirtualDomNode[] => {
  if (scrollBarHeight === 0) {
    return []
  }
  const roundedScrollBarY = Math.round(scrollBarY)
  return [
    {
      ariaControls: DomId.TreeItems,
      ariaValueNow: scrollBarValue,
      childCount: 1,
      className: MergeClassNames.mergeClassNames(ClassNames.ScrollBar, ClassNames.ScrollBarVertical),
      onPointerDown: DomEventListenerFunctions.HandleScrollBarPointerDown,
      role: AriaRoles.ScrollBar,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: MergeClassNames.mergeClassNames(ClassNames.ScrollBarThumb, `ScrollBarThumbTop-${roundedScrollBarY}`),
      height: scrollBarHeight,
      type: VirtualDomElements.Div,
    },
  ]
}
