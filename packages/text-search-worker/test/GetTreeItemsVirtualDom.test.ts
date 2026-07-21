import { expect, test } from '@jest/globals'
import { getTreeItemsVirtualDom } from '../src/parts/GetTreeItemsVirtualDom/GetTreeItemsVirtualDom.ts'

test('getTreeItemsVirtualDom - rounds subpixel tree items top classname value', () => {
  const result = getTreeItemsVirtualDom([], 18.609375, 22)
  expect(result[0]).toMatchObject({
    className: 'TreeItems TreeItemsTop--19',
  })
})
