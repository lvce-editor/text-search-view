import { expect, test } from '@jest/globals'
import { AriaRoles } from '@lvce-editor/constants'
import * as GetSearchInputErrorVirtualDom from '../src/parts/GetSearchInputErrorVirtualDom/GetSearchInputErrorVirtualDom.ts'

test('getSearchInputErrorVirtualDom - with error message', () => {
  const errorMessage = 'Invalid regular expression'
  expect(GetSearchInputErrorVirtualDom.getSearchInputErrorVirtualDom(errorMessage)).toEqual([
    {
      childCount: 1,
      className: 'SearchInputError',
      role: AriaRoles.Alert,
      type: 4,
    },
    {
      childCount: 0,
      text: errorMessage,
      type: 12,
    },
  ])
})

test('getSearchInputErrorVirtualDom - without error message', () => {
  expect(GetSearchInputErrorVirtualDom.getSearchInputErrorVirtualDom('')).toEqual([])
})
