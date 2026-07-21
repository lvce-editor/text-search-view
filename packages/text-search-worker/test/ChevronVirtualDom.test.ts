import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ChevronVirtualDom from '../src/parts/ChevronVirtualDom/ChevronVirtualDom.ts'

test('getChevronDownVirtualDom', () => {
  expect(ChevronVirtualDom.chevronDownVirtualDom).toEqual({
    childCount: 0,
    className: 'Chevron MaskIconChevronDown',
    type: VirtualDomElements.Div,
  })
})

test('getChevronRightVirtualDom', () => {
  expect(ChevronVirtualDom.chevronRightVirtualDom).toEqual({
    childCount: 0,
    className: 'Chevron MaskIconChevronRight',
    type: VirtualDomElements.Div,
  })
})
