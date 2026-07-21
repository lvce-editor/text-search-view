import { test, expect } from '@jest/globals'
import { AriaRoles } from '@lvce-editor/constants'
import type { Action } from '../src/parts/Action/Action.ts'
import * as GetActionsVirtualDom from '../src/parts/GetActionsVirtualDom/GetActionsVirtualDom.ts'

test('getActionsVirtualDom - should return correct virtual dom structure', () => {
  const actions: readonly Action[] = [
    {
      command: 'Search.searchInFiles',
      enabled: true,
      icon: 'Search in Files',
      id: 'searchInFiles',
      label: 'Search in Files',
      type: 1,
    },
    {
      command: 'Search.findInFile',
      enabled: true,
      icon: 'Find in File',
      id: 'findInFile',
      label: 'Find in File',
      type: 1,
    },
  ]

  expect(GetActionsVirtualDom.getActionsVirtualDom(actions)).toEqual([
    {
      childCount: 2,
      className: 'Actions',
      onClick: 22,
      role: AriaRoles.ToolBar,
      type: 4,
    },
    {
      childCount: 1,
      className: 'IconButton',
      name: 'searchInFiles',
      title: 'Search in Files',
      type: 1,
    },
    {
      childCount: 0,
      className: 'MaskIcon MaskIconSearch in Files',
      role: AriaRoles.None,
      type: 4,
    },
    {
      childCount: 1,
      className: 'IconButton',
      name: 'findInFile',
      title: 'Find in File',
      type: 1,
    },
    {
      childCount: 0,
      className: 'MaskIcon MaskIconFind in File',
      role: AriaRoles.None,
      type: 4,
    },
  ])
})

test('getActionsVirtualDom - should handle empty actions array', () => {
  expect(GetActionsVirtualDom.getActionsVirtualDom([])).toEqual([
    {
      childCount: 0,
      className: 'Actions',
      onClick: 22,
      role: AriaRoles.ToolBar,
      type: 4,
    },
  ])
})
