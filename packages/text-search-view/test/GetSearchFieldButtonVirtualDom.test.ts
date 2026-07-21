import { expect, test } from '@jest/globals'
import { AriaRoles } from '@lvce-editor/constants'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { InputAction } from '../src/parts/InputAction/InputAction.ts'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetSearchFieldButtonVirtualDom from '../src/parts/GetSearchFieldButtonVirtualDom/GetSearchFieldButtonVirtualDom.ts'
import * as InputActionFlag from '../src/parts/InputActionFlag/InputActionFlag.ts'

test('getSearchFieldButtonVirtualDom - enabled checkbox', () => {
  const button: InputAction = {
    flag: InputActionFlag.CheckBoxEnabled,
    icon: 'MaskIconCaseSensitive',
    name: 'MatchCase',
    title: 'Match Case',
  }

  expect(GetSearchFieldButtonVirtualDom.getSearchFieldButtonVirtualDom(button)).toEqual([
    {
      ariaChecked: true,
      childCount: 1,
      className: 'SearchFieldButton SearchFieldButtonChecked',
      disabled: undefined,
      name: 'MatchCase',
      onClick: DomEventListenerFunctions.HandleButtonClick,
      role: AriaRoles.CheckBox,
      tabIndex: 0,
      title: 'Match Case',
      type: VirtualDomElements.Button,
    },
    {
      childCount: 0,
      className: 'MaskIcon MaskIconCaseSensitive',
      type: VirtualDomElements.Span,
    },
  ])
})

test('getSearchFieldButtonVirtualDom - disabled button', () => {
  const button: InputAction = {
    flag: InputActionFlag.ButtonDisabled,
    icon: 'MaskIconReplaceAll',
    name: 'ReplaceAll',
    title: 'Replace All',
  }

  expect(GetSearchFieldButtonVirtualDom.getSearchFieldButtonVirtualDom(button)).toEqual([
    {
      ariaChecked: undefined,
      childCount: 1,
      className: 'SearchFieldButton SearchFieldButtonDisabled',
      disabled: true,
      name: 'ReplaceAll',
      onClick: DomEventListenerFunctions.HandleButtonClick,
      role: undefined,
      tabIndex: 0,
      title: 'Replace All',
      type: VirtualDomElements.Button,
    },
    {
      childCount: 0,
      className: 'MaskIcon MaskIconReplaceAll',
      type: VirtualDomElements.Span,
    },
  ])
})
