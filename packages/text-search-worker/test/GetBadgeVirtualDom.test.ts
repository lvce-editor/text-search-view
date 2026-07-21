import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as GetBadgeVirtualDom from '../src/parts/GetBadgeVirtualDom/GetBadgeVirtualDom.ts'

test('getBadgeVirtualDom - returns correct structure with custom class and count', () => {
  const count = '42'
  expect(GetBadgeVirtualDom.getBadgeVirtualDom(count)).toEqual([
    {
      childCount: 1,
      className: 'Badge SourceControlBadge',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: '42',
      type: 12,
    },
  ])
})
