import { expect, test } from '@jest/globals'
import { AriaRoles } from '@lvce-editor/constants'
import type { InputAction } from '../src/parts/InputAction/InputAction.ts'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetSearchFieldVirtualDom from '../src/parts/GetSearchFieldVirtualDom/GetSearchFieldVirtualDom.ts'

test('NotReadableError', () => {
  const name = ''
  const placeholder = ''
  const onInput = 'handleInput'
  const insideButtons: readonly InputAction[] = []
  const outsideButtons: readonly InputAction[] = []
  expect(GetSearchFieldVirtualDom.getSearchFieldVirtualDom(name, placeholder, onInput, insideButtons, outsideButtons)).toEqual([
    {
      childCount: 2,
      className: 'SearchField',
      role: AriaRoles.None,
      type: 4,
    },
    {
      autocapitalize: 'off',
      autocorrect: 'off',
      childCount: 0,
      className: 'MultilineInputBox',
      name: '',
      onBlur: DomEventListenerFunctions.HandleInputBlur,
      onContextMenu: DomEventListenerFunctions.HandleInputContextMenu,
      onFocus: DomEventListenerFunctions.HandleInputFocus,
      onInput: 'handleInput',
      onSelectionChange: 21,
      placeholder: '',
      spellcheck: false,
      type: 62,
    },
    {
      childCount: 0,
      className: 'SearchFieldButtons',
      type: 4,
    },
  ])
})

test('getSearchFieldVirtualDom - with error', () => {
  const name = ''
  const placeholder = ''
  const onInput = 'handleInput'
  const insideButtons: readonly InputAction[] = []
  const outsideButtons: readonly InputAction[] = []
  const hasError = true
  expect(GetSearchFieldVirtualDom.getSearchFieldVirtualDom(name, placeholder, onInput, insideButtons, outsideButtons, hasError)).toEqual([
    {
      childCount: 2,
      className: 'SearchField SearchFieldError',
      role: AriaRoles.None,
      type: 4,
    },
    {
      autocapitalize: 'off',
      autocorrect: 'off',
      childCount: 0,
      className: 'MultilineInputBox',
      name: '',
      onBlur: DomEventListenerFunctions.HandleInputBlur,
      onContextMenu: DomEventListenerFunctions.HandleInputContextMenu,
      onFocus: DomEventListenerFunctions.HandleInputFocus,
      onInput: 'handleInput',
      onSelectionChange: 21,
      placeholder: '',
      spellcheck: false,
      type: 62,
    },
    {
      childCount: 0,
      className: 'SearchFieldButtons',
      type: 4,
    },
  ])
})
