import { AriaRoles } from '@lvce-editor/constants'
import { ClassNames } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { InputAction } from '../InputAction/InputAction.ts'
import type { OutSideButtonsDom } from '../OutSideButtonsDom/OutSideButtonsDom.ts'
import * as GetSearchFieldButtonVirtualDom from '../GetSearchFieldButtonVirtualDom/GetSearchFieldButtonVirtualDom.ts'

export const getOutSideButtonsDom = (outsideButtons: readonly InputAction[]): OutSideButtonsDom => {
  if (outsideButtons.length === 0) {
    return {
      postNodes: [],
      preNodes: [],
    }
  }
  return {
    postNodes: outsideButtons.flatMap(GetSearchFieldButtonVirtualDom.getSearchFieldButtonVirtualDom),
    preNodes: [
      {
        childCount: 1 + outsideButtons.length,
        className: ClassNames.SearchFieldContainer,
        role: AriaRoles.None,
        type: VirtualDomElements.Div,
      },
    ],
  }
}
