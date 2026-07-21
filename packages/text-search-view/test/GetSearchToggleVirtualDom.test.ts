import { expect, test } from '@jest/globals'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetSearchToggleVirtualDom from '../src/parts/GetSearchToggleVirtualDom/GetSearchToggleVirtualDom.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'

test('getSearchToggleVirtualDom - not expanded', () => {
  const flags = 0
  expect(GetSearchToggleVirtualDom.getSearchToggleVirtualDom(flags)).toEqual([
    {
      ariaExpanded: false,
      ariaLabel: 'Toggle Replace',
      childCount: 1,
      className: 'IconButton SearchToggleButton',
      name: 'ToggleReplace',
      onClick: DomEventListenerFunctions.HandleButtonClick,
      title: 'Toggle Replace',
      type: 1,
    },
    {
      childCount: 0,
      className: 'MaskIcon MaskIconChevronRight',
      type: 4,
    },
  ])
})

test('getSearchToggleVirtualDom - expanded', () => {
  const flags = SearchFlags.ReplaceExpanded
  expect(GetSearchToggleVirtualDom.getSearchToggleVirtualDom(flags)).toEqual([
    {
      ariaExpanded: true,
      ariaLabel: 'Toggle Replace',
      childCount: 1,
      className: 'IconButton SearchToggleButton SearchToggleButtonExpanded',
      name: 'ToggleReplace',
      onClick: DomEventListenerFunctions.HandleButtonClick,
      title: 'Toggle Replace',
      type: 1,
    },
    {
      childCount: 0,
      className: 'MaskIcon MaskIconChevronDown',
      type: 4,
    },
  ])
})
