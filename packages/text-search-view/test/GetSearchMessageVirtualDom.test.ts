import { expect, test } from '@jest/globals'
import { AriaRoles } from '@lvce-editor/constants'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetSearchMessageVirtualDom from '../src/parts/GetSearchMessageVirtualDom/GetSearchMessageVirtualDom.ts'

test('getSearchMessageVirtualDom - shows the open in editor action for search results', () => {
  expect(GetSearchMessageVirtualDom.getSearchMessageVirtualDom('645 results in 56 files', true, true)).toEqual([
    {
      childCount: 3,
      className: 'ViewletSearchMessage ViewletSearchMessageIndented',
      role: AriaRoles.Status,
      type: 4,
    },
    { childCount: 0, text: '645 results in 56 files', type: 12 },
    { childCount: 0, text: ' - ', type: 12 },
    {
      ariaLabel: 'Open in editor',
      childCount: 1,
      className: 'MessageAction SearchWorkspaceMessageAction',
      name: 'OpenSearchEditor',
      onClick: DomEventListenerFunctions.HandleActionClick,
      title: 'Copy current search results to an editor (Alt+Enter)',
      type: 1,
    },
    { childCount: 0, text: 'Open in editor', type: 12 },
  ])
})

test('getSearchMessageVirtualDom - hides the action when disabled', () => {
  const dom = GetSearchMessageVirtualDom.getSearchMessageVirtualDom('645 results in 56 files', false, false)
  expect(dom).toHaveLength(2)
  expect(dom[0]).toMatchObject({ childCount: 1 })
})
