import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getSearchEditorContextLinesVirtualDom } from '../src/parts/GetSearchEditorContextLinesVirtualDom/GetSearchEditorContextLinesVirtualDom.ts'
import { getSearchHeaderTopVirtualDom } from '../src/parts/GetSearchHeaderTopVirtualDom/GetSearchHeaderTopVirtualDom.ts'

test('getSearchEditorContextLinesVirtualDom - enabled', () => {
  expect(getSearchEditorContextLinesVirtualDom(2, true)).toEqual([
    {
      ariaLabel: 'Context Lines',
      childCount: 0,
      className: 'InputBox SearchEditorContextLinesInput',
      inputType: 'number',
      min: 0,
      name: 'ContextLines',
      onInput: DomEventListenerFunctions.HandleInput2,
      type: VirtualDomElements.Input,
      value: '2',
    },
    {
      ariaChecked: true,
      childCount: 1,
      className: 'SearchFieldButton SearchFieldButtonChecked',
      disabled: undefined,
      name: 'ToggleContextLines',
      onClick: DomEventListenerFunctions.HandleButtonClick,
      role: 'checkbox',
      tabIndex: 0,
      title: 'Toggle Context Lines',
      type: VirtualDomElements.Button,
    },
    {
      childCount: 0,
      className: 'MaskIcon MaskIconListSelection',
      type: VirtualDomElements.Span,
    },
  ])
})

test('getSearchHeaderTopVirtualDom - includes context line controls only for search editors', () => {
  const searchEditorDom = getSearchHeaderTopVirtualDom(0, '', 0, 0, true, 1, true)
  const sideBarDom = getSearchHeaderTopVirtualDom(0, '', 0, 0)
  expect(searchEditorDom.some((node) => node.name === 'ContextLines')).toBe(true)
  expect(searchEditorDom.some((node) => node.name === 'ToggleContextLines')).toBe(true)
  expect(sideBarDom.some((node) => node.name === 'ContextLines')).toBe(false)
  expect(sideBarDom.some((node) => node.name === 'ToggleContextLines')).toBe(false)
})
