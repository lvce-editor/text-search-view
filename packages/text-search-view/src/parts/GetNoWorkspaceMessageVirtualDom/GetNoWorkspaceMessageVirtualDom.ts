import { ClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as LocalClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import * as SearchStrings from '../SearchStrings/SearchStrings.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getNoWorkspaceMessageVirtualDom = (workspacePath: string | undefined): readonly VirtualDomNode[] => {
  if (workspacePath !== '') {
    return []
  }
  return [
    {
      childCount: 2,
      className: MergeClassNames.mergeClassNames(
        ClassNames.ViewletSearchMessage,
        ClassNames.ViewletSearchMessageIndented,
        LocalClassNames.SearchWorkspaceMessage,
      ),
      type: VirtualDomElements.Div,
    },
    text(`${SearchStrings.noWorkspaceFolder()} - `),
    {
      childCount: 1,
      className: LocalClassNames.SearchWorkspaceMessageAction,
      onClick: DomEventListenerFunctions.HandleOpenFolderClick,
      type: VirtualDomElements.Button,
    },
    text(SearchStrings.openFolder()),
  ]
}
