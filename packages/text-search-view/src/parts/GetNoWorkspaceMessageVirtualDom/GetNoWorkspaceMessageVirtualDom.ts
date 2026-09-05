import { ClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as LocalClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import * as SearchStrings from '../SearchStrings/SearchStrings.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const parentNode: VirtualDomNode = {
  childCount: 2,
  className: MergeClassNames.mergeClassNames(
    ClassNames.ViewletSearchMessage,
    ClassNames.ViewletSearchMessageIndented,
    LocalClassNames.SearchWorkspaceMessage,
  ),
  type: VirtualDomElements.Div,
}

const actionNode: VirtualDomNode = {
  childCount: 1,
  className: MergeClassNames.mergeClassNames(LocalClassNames.MessageAction, LocalClassNames.SearchWorkspaceMessageAction),
  onClick: DomEventListenerFunctions.HandleOpenFolderClick,
  type: VirtualDomElements.Button,
}

export const getNoWorkspaceMessageVirtualDom = (workspaceUri: string | undefined): readonly VirtualDomNode[] => {
  if (workspaceUri !== '') {
    return []
  }
  return [parentNode, text(`${SearchStrings.noWorkspaceFolder()} - `), actionNode, text(SearchStrings.openFolder())]
}
