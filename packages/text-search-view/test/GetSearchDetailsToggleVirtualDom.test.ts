import { expect, test } from '@jest/globals'
import { AriaRoles } from '@lvce-editor/constants'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetSearchDetailsToggleVirtualDom from '../src/parts/GetSearchDetailsToggleVirtualDom/GetSearchDetailsToggleVirtualDom.ts'

test('getSearchDetailsToggleVirtualDom', () => {
  expect(GetSearchDetailsToggleVirtualDom.getSearchDetailsToggleVirtualDom()).toEqual([
    {
      ariaLabel: 'Toggle Search Details',
      childCount: 1,
      className: 'ToggleDetails IconButton',
      name: 'ToggleSearchDetails',
      onClick: DomEventListenerFunctions.HandleButtonClick,
      role: AriaRoles.Button,
      tabIndex: 0,
      title: 'Toggle Search Details',
      type: 1,
    },
    {
      childCount: 0,
      className: 'MaskIcon MaskIconEllipsis',
      type: 4,
    },
  ])
})
