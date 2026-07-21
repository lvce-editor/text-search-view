import { expect, test } from '@jest/globals'
import { AriaRoles } from '@lvce-editor/constants'
import type { DisplaySearchResult } from '../src/parts/DisplaySearchResult/DisplaySearchResult.ts'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as ExpandedType from '../src/parts/ExpandedType/ExpandedType.ts'
import * as GetSearchResultsVirtualDom from '../src/parts/GetSearchResultsVirtualDom/GetSearchResultsVirtualDom.ts'

test('getSearchResultsVirtualDom', () => {
  const searchResults: readonly DisplaySearchResult[] = [
    {
      badgeText: '',
      depth: 0,
      expanded: ExpandedType.Expanded,
      focused: false,
      icon: 'test',
      indent: 0,
      matchLength: 1,
      matchStart: 0,
      posInSet: 2,
      replacement: '',
      setSize: 2,
      text: 'abc',
      title: 'abc',
    },
  ]
  const focusOutline = false
  const scrollBarHeight = 0
  const scrollBarY = 0
  const scrollBarValue = 0
  const deltaY = 0
  const itemHeight = 1
  expect(
    GetSearchResultsVirtualDom.getSearchResultsVirtualDom(
      searchResults,
      focusOutline,
      scrollBarHeight,
      scrollBarY,
      scrollBarValue,
      deltaY,
      itemHeight,
    ),
  ).toEqual([
    {
      childCount: 1,
      className: 'Viewlet List Tree',
      onBlur: DomEventListenerFunctions.HandleListBlur,
      role: AriaRoles.Tree,
      tabIndex: 0,
      type: 4,
      // onPointerDown: DomEventListenerFunctions.HandleListPointerDown,
      // onFocus: DomEventListenerFunctions.HandleListFocus,
    },
    {
      childCount: 1,
      className: 'TreeItems TreeItemsTop-0',
      id: 'TreeItems',
      onBlur: 11,
      onClick: 1,
      onContextMenu: 2,
      onWheel: 16,
      role: 'none',
      type: 4,
    },
    {
      ariaExpanded: 'true',
      ariaLabel: 'abc',
      ariaLevel: 0,
      ariaPosInSet: 2,
      ariaSetSize: 2,
      childCount: 4,
      className: 'TreeItem Indent-0 IndentRight-12',
      role: AriaRoles.TreeItem,
      title: 'abc',
      type: 4,
    },
    {
      childCount: 0,
      className: 'Chevron MaskIconChevronDown',
      type: 4,
    },
    {
      childCount: 0,
      className: 'FileIcon',
      role: AriaRoles.None,
      src: 'test',
      type: 17,
    },
    {
      childCount: 3,
      className: 'Label Grow',
      type: 4,
    },
    {
      childCount: 0,
      text: '',
      type: 12,
    },
    {
      childCount: 1,
      className: 'Highlight',
      type: 8,
    },
    {
      childCount: 0,
      text: 'a',
      type: 12,
    },
    {
      childCount: 0,
      text: 'bc',
      type: 12,
    },
    {
      childCount: 1,
      className: 'SearchRemove',
      name: 'Remove',
      title: 'Remove',
      type: 1,
    },
    {
      childCount: 0,
      className: 'MaskIcon MaskIconClose',
      type: 4,
    },
  ])
})

test('getSearchResultsVirtualDom - uses dynamic class for scrollbar thumb top', () => {
  const result = GetSearchResultsVirtualDom.getSearchResultsVirtualDom([], false, 20, 18.609375, 30, 0, 1)
  expect(result).toContainEqual({
    ariaControls: 'TreeItems',
    ariaValueNow: 30,
    childCount: 1,
    className: 'ScrollBar ScrollBarVertical',
    onPointerDown: DomEventListenerFunctions.HandleScrollBarPointerDown,
    role: AriaRoles.ScrollBar,
    type: 4,
  })
  expect(result).toContainEqual({
    childCount: 0,
    className: 'ScrollBarThumb ScrollBarThumbTop-19',
    height: 20,
    type: 4,
  })
})
