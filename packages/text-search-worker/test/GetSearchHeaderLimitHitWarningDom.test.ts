import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { SearchWarningMessage } from '../src/parts/ClassNames/ClassNames.ts'
import * as GetSearchHeaderLimitHitWarningDom from '../src/parts/GetSearchHeaderLimitHitWarningDom/GetSearchHeaderLimitHitWarningDom.ts'

test('getSearchHeaderLimitHitVirtualDom - returns no nodes when limitHitWarning is empty', () => {
  const result = GetSearchHeaderLimitHitWarningDom.getSearchHeaderLimitHitVirtualDom('')
  expect(result).toEqual([])
})

test('getSearchHeaderLimitHitVirtualDom - returns warning div with text when limitHitWarning has value', () => {
  const warningMessage = 'Search limit reached: 1000 results'
  const result = GetSearchHeaderLimitHitWarningDom.getSearchHeaderLimitHitVirtualDom(warningMessage)
  expect(result).toEqual([
    {
      childCount: 1,
      className: SearchWarningMessage,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: warningMessage,
      type: 12,
    },
  ])
})

test('getSearchHeaderLimitHitVirtualDom - handles different warning messages', () => {
  const warningMessage = 'Too many results found'
  const result = GetSearchHeaderLimitHitWarningDom.getSearchHeaderLimitHitVirtualDom(warningMessage)
  expect(result).toEqual([
    {
      childCount: 1,
      className: SearchWarningMessage,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: warningMessage,
      type: 12,
    },
  ])
})
