import { ClassNames } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetInputActionsExclude from '../GetInputActionsExclude/GetInputActionsExclude.ts'
import * as GetInputActionsInclude from '../GetInputActionsInclude/GetInputActionsInclude.ts'
import * as GetSearchDetailsToggleVirtualDom from '../GetSearchDetailsToggleVirtualDom/GetSearchDetailsToggleVirtualDom.ts'
import * as GetSearchFieldVirtualDom from '../GetSearchFieldVirtualDom/GetSearchFieldVirtualDom.ts'
import * as GetSearchMessageVirtualDom from '../GetSearchMessageVirtualDom/GetSearchMessageVirtualDom.ts'
import * as InputName from '../InputName/InputName.ts'
import * as SearchStrings from '../SearchStrings/SearchStrings.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const detailsNode: VirtualDomNode = {
  childCount: 5,
  className: ClassNames.SearchHeaderDetailsExpanded,
  type: VirtualDomElements.Div,
}

const topNode: VirtualDomNode = {
  childCount: 2,
  className: ClassNames.SearchHeaderDetailsExpandedTop,
  type: VirtualDomElements.Div,
}

const headingNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.SearchHeaderDetailsHeading,
  type: VirtualDomElements.H4,
}

export const getSearchHeaderDetailsExpandedVirtualDom = (flags: number, message: string): readonly VirtualDomNode[] => {
  const includeButtons = GetInputActionsInclude.getInputActionsInclude(flags)
  const excludeButtons = GetInputActionsExclude.getInputActionsExclude(flags)
  const includePlaceholder = SearchStrings.include()
  const excludePlaceholder = SearchStrings.exclude()
  return [
    detailsNode,
    topNode,
    ...GetSearchDetailsToggleVirtualDom.getSearchDetailsToggleVirtualDom(),
    headingNode,
    text(SearchStrings.filesToInclude()),
    ...GetSearchFieldVirtualDom.getSearchFieldVirtualDom(
      InputName.FilesToInclude,
      includePlaceholder,
      DomEventListenerFunctions.HandleInput2,
      includeButtons.inside,
      includeButtons.outside,
    ),
    headingNode,
    text(SearchStrings.filesToExclude()),
    ...GetSearchFieldVirtualDom.getSearchFieldVirtualDom(
      InputName.FilesToExclude,
      excludePlaceholder,
      DomEventListenerFunctions.HandleInput2,
      excludeButtons.inside,
      excludeButtons.outside,
    ),
    ...GetSearchMessageVirtualDom.getSearchMessageVirtualDom(message, false),
  ]
}
