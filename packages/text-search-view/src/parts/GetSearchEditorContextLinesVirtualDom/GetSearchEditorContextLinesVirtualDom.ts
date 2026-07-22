import { ClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetSearchFieldButtonVirtualDom from '../GetSearchFieldButtonVirtualDom/GetSearchFieldButtonVirtualDom.ts'
import * as InputActionFlag from '../InputActionFlag/InputActionFlag.ts'
import * as InputName from '../InputName/InputName.ts'
import * as SearchStrings from '../SearchStrings/SearchStrings.ts'

export const getSearchEditorContextLinesVirtualDom = (contextLines: number, contextLinesEnabled: boolean): readonly VirtualDomNode[] => {
  const button = {
    flag: contextLinesEnabled ? InputActionFlag.CheckBoxEnabled : InputActionFlag.CheckBoxDisabled,
    icon: 'MaskIconListSelection',
    name: InputName.ToggleContextLines,
    title: SearchStrings.toggleContextLines(),
  }
  return [
    {
      ariaLabel: SearchStrings.contextLines(),
      childCount: 0,
      className: `${ClassNames.InputBox} SearchEditorContextLinesInput`,
      inputType: 'number',
      min: 0,
      name: InputName.ContextLines,
      onInput: DomEventListenerFunctions.HandleInput2,
      type: VirtualDomElements.Input,
      value: `${contextLines}`,
    },
    ...GetSearchFieldButtonVirtualDom.getSearchFieldButtonVirtualDom(button),
  ]
}
