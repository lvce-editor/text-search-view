import { ClassNames } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as InputName from '../InputName/InputName.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import * as SearchStrings from '../SearchStrings/SearchStrings.ts'

export const getSearchToggleVirtualDom = (replaceExpanded: number): readonly VirtualDomNode[] => {
  return [
    {
      ariaExpanded: Boolean(replaceExpanded),
      ariaLabel: SearchStrings.toggleReplace(), // TODO compute label only once
      childCount: 1,
      className: MergeClassNames.mergeClassNames(
        ClassNames.IconButton,
        ClassNames.SearchToggleButton,
        replaceExpanded ? ClassNames.SearchToggleButtonExpanded : '',
      ),
      name: InputName.ToggleReplace,
      onClick: DomEventListenerFunctions.HandleButtonClick,
      title: SearchStrings.toggleReplace(),
      type: VirtualDomElements.Button,
    },
    {
      childCount: 0,
      className: MergeClassNames.mergeClassNames(
        ClassNames.MaskIcon,
        replaceExpanded ? ClassNames.MaskIconChevronDown : ClassNames.MaskIconChevronRight,
      ),
      type: VirtualDomElements.Div,
    },
  ]
}
