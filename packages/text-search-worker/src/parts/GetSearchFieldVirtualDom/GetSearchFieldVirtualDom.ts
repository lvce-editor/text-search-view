import { AriaRoles } from '@lvce-editor/constants'
import { ClassNames } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { InputAction } from '../InputAction/InputAction.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetOutSideButtonsDom from '../GetOutSideButtonsDom/GetOutSideButtonsDom.ts'
import * as GetSearchFieldButtonVirtualDom from '../GetSearchFieldButtonVirtualDom/GetSearchFieldButtonVirtualDom.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'

const getSearchFieldClassName = (hasError: boolean): string => {
  if (hasError) {
    return MergeClassNames.mergeClassNames(ClassNames.SearchField, ClassNames.SearchFieldError)
  }
  return ClassNames.SearchField
}

export const getSearchFieldVirtualDom = (
  name: string,
  placeholder: string,
  onInput: string | number,
  insideButtons: readonly InputAction[],
  outsideButtons: readonly InputAction[],
  hasError = false,
): readonly VirtualDomNode[] => {
  const { postNodes, preNodes } = GetOutSideButtonsDom.getOutSideButtonsDom(outsideButtons)
  const searchFieldClassName = getSearchFieldClassName(hasError)
  const dom: readonly VirtualDomNode[] = [
    ...preNodes,
    {
      childCount: 2,
      className: searchFieldClassName,
      role: AriaRoles.None,
      type: VirtualDomElements.Div,
    },
    {
      autocapitalize: 'off',
      autocorrect: 'off',
      childCount: 0,
      className: ClassNames.MultilineInputBox,
      name,
      onBlur: DomEventListenerFunctions.HandleInputBlur,
      onContextMenu: DomEventListenerFunctions.HandleInputContextMenu,
      onFocus: DomEventListenerFunctions.HandleInputFocus,
      onInput,
      onSelectionChange: DomEventListenerFunctions.HandleInputSelectionChange,
      placeholder,
      spellcheck: false,
      type: VirtualDomElements.TextArea,
    },
    {
      childCount: insideButtons.length,
      className: ClassNames.SearchFieldButtons,
      type: VirtualDomElements.Div,
    },
    ...insideButtons.flatMap(GetSearchFieldButtonVirtualDom.getSearchFieldButtonVirtualDom),
    ...postNodes,
  ]
  return dom
}
