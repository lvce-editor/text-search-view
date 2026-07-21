import { expect, test } from '@jest/globals'
import * as GetSearchHeaderDetailsVirtualDom from '../src/parts/GetSearchHeaderDetailsVirtualDom/GetSearchHeaderDetailsVirtualDom.ts'
import { DetailsExpanded } from '../src/parts/SearchFlags/SearchFlags.ts'

test('getSearchHeaderDetailsVirtualDom', () => {
  const flags = 0
  const message = ''
  const dom = GetSearchHeaderDetailsVirtualDom.getSearchHeaderDetailsVirtualDom(flags, message)
  expect(dom[0]).toEqual({
    childCount: 2,
    className: 'SearchHeaderDetails',
    type: 4,
  })
})

test('getSearchHeaderDetailsVirtualDom - expanded', () => {
  const flags = DetailsExpanded
  const message = ''
  const dom = GetSearchHeaderDetailsVirtualDom.getSearchHeaderDetailsVirtualDom(flags, message)
  expect(dom[0]).toEqual({
    childCount: 5,
    className: 'SearchHeaderDetailsExpanded',
    type: 4,
  })
})
