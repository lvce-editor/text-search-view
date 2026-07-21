import { expect, test } from '@jest/globals'
import * as ChevronVirtualDom from '../src/parts/ChevronVirtualDom/ChevronVirtualDom.ts'
import * as ExpandedType from '../src/parts/ExpandedType/ExpandedType.ts'
import { getChevronVirtualDom } from '../src/parts/GetChevronVirtualDom/GetChevronVirtualDom.ts'

test('getChevronVirtualDom returns chevronDownVirtualDom for Expanded', () => {
  const result = getChevronVirtualDom(ExpandedType.Expanded)
  expect(result).toEqual([ChevronVirtualDom.chevronDownVirtualDom])
})

test('getChevronVirtualDom returns chevronRightVirtualDom for Collapsed', () => {
  const result = getChevronVirtualDom(ExpandedType.Collapsed)
  expect(result).toEqual([ChevronVirtualDom.chevronRightVirtualDom])
})

test('getChevronVirtualDom returns empty array for None', () => {
  const result = getChevronVirtualDom(ExpandedType.None)
  expect(result).toEqual([])
})

test('getChevronVirtualDom returns empty array for invalid value', () => {
  const result = getChevronVirtualDom(999)
  expect(result).toEqual([])
})
