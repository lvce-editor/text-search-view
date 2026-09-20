import { AriaRoles } from '@lvce-editor/constants'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as LocalClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getSearchMessageClassName } from '../GetSearchMessageClassName/GetSearchMessageClassName.ts'
import * as InputName from '../InputName/InputName.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import * as SearchStrings from '../SearchStrings/SearchStrings.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const searchMessageActionClassName = MergeClassNames.mergeClassNames(LocalClassNames.MessageAction, LocalClassNames.SearchWorkspaceMessageAction)

const getMessageChildren = (message: string, showOpenInEditorLink: boolean, actionNode: VirtualDomNode): readonly VirtualDomNode[] => {
  if (showOpenInEditorLink) {
    return [text(message), text(' - '), actionNode, text(SearchStrings.openInEditor())]
  }
  return [text(message)]
}

export const getSearchMessageVirtualDom = (message: string, indented: boolean, showOpenInEditorLink = false): readonly VirtualDomNode[] => {
  const actionNode: VirtualDomNode = {
    ariaLabel: SearchStrings.openInEditor(),
    childCount: 1,
    className: searchMessageActionClassName,
    name: InputName.OpenSearchEditor,
    onClick: DomEventListenerFunctions.HandleActionClick,
    title: SearchStrings.copyCurrentSearchResultsToEditor(),
    type: VirtualDomElements.Button,
  }
  const messageNode: VirtualDomNode = {
    childCount: showOpenInEditorLink ? 3 : 1,
    className: getSearchMessageClassName(indented),
    role: AriaRoles.Status,
    type: VirtualDomElements.Div,
  }
  return [messageNode, ...getMessageChildren(message, showOpenInEditorLink, actionNode)]
}
