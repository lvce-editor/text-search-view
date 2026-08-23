import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetNoWorkspaceMessageVirtualDom from '../src/parts/GetNoWorkspaceMessageVirtualDom/GetNoWorkspaceMessageVirtualDom.ts'

test('getNoWorkspaceMessageVirtualDom - no workspace folder', () => {
  expect(GetNoWorkspaceMessageVirtualDom.getNoWorkspaceMessageVirtualDom('')).toEqual([
    {
      childCount: 2,
      className: 'ViewletSearchMessage ViewletSearchMessageIndented SearchWorkspaceMessage',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: 'You have not opened or specified a folder. - ',
      type: VirtualDomElements.Text,
    },
    {
      childCount: 1,
      className: 'SearchWorkspaceMessageAction',
      onClick: DomEventListenerFunctions.HandleOpenFolderClick,
      type: VirtualDomElements.Button,
    },
    {
      childCount: 0,
      text: 'Open Folder',
      type: VirtualDomElements.Text,
    },
  ])
})

test('getNoWorkspaceMessageVirtualDom - workspace folder', () => {
  expect(GetNoWorkspaceMessageVirtualDom.getNoWorkspaceMessageVirtualDom('/test')).toEqual([])
})
