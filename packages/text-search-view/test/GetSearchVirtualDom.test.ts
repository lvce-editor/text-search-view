import { expect, test } from '@jest/globals'
import { AriaRoles } from '@lvce-editor/constants'
import type { DisplaySearchResult } from '../src/parts/DisplaySearchResult/DisplaySearchResult.ts'
import type { VirtualDomNode } from '../src/parts/VirtualDomNode/VirtualDomNode.ts'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as ExpandedType from '../src/parts/ExpandedType/ExpandedType.ts'
import * as GetSearchVirtualDom from '../src/parts/GetSearchVirtualDom/GetSearchVirtualDom.ts'

test('getSearchVirtualDom returns correct virtual DOM structure', () => {
  const visibleItems: readonly DisplaySearchResult[] = [
    {
      badgeText: '',
      depth: 0,
      expanded: ExpandedType.Expanded,
      focused: false,
      icon: 'test',
      indent: 0,
      matchLength: 0,
      matchStart: 0,
      posInSet: 0,
      replacement: '',
      setSize: 0,
      text: 'Result 1',
      title: 'Title 1',
    },
    {
      badgeText: '',
      depth: 0,
      expanded: ExpandedType.Expanded,
      focused: false,
      icon: 'test',
      indent: 0,
      matchLength: 0,
      matchStart: 0,
      posInSet: 0,
      replacement: '',
      setSize: 0,
      text: 'Result 2',
      title: 'Title 2',
    },
  ]
  const flags = 0
  const message = 'Search results'
  const focusOutline = false
  const scrollBarHeight = 0
  const scrollBarY = 0
  const scrollBarValue = 0
  const deltaY = 0
  const ItemHeight = 1
  const matchCount = 1
  const focus = 0

  const result: readonly VirtualDomNode[] = GetSearchVirtualDom.getSearchVirtualDom(
    visibleItems,
    flags,
    message,
    focusOutline,
    '',
    scrollBarHeight,
    scrollBarY,
    scrollBarValue,
    deltaY,
    ItemHeight,
    matchCount,
    '',
    focus,
  )

  expect(result).toEqual([
    {
      childCount: 2,
      className: 'Viewlet Search',
      type: 4,
    },
    {
      childCount: 2,
      className: 'SearchHeader',
      onContextMenu: 3,
      role: AriaRoles.None,
      type: 4,
    },
    {
      childCount: 2,
      className: 'SearchHeaderTop',
      role: AriaRoles.None,
      type: 4,
    },
    {
      ariaExpanded: false,
      ariaLabel: 'Toggle Replace',
      childCount: 1,
      className: 'IconButton SearchToggleButton',
      name: 'ToggleReplace',
      onClick: DomEventListenerFunctions.HandleButtonClick,
      title: 'Toggle Replace',
      type: 1,
    },
    {
      childCount: 0,
      className: 'MaskIcon MaskIconChevronRight',
      type: 4,
    },
    {
      childCount: 1,
      className: 'SearchHeaderTopRight',
      role: AriaRoles.None,
      type: 4,
    },
    {
      childCount: 2,
      className: 'SearchField',
      role: AriaRoles.None,
      type: 4,
    },
    {
      autocapitalize: 'off',
      autocorrect: 'off',
      childCount: 0,
      className: 'MultilineInputBox',
      name: 'SearchValue',
      onBlur: DomEventListenerFunctions.HandleInputBlur,
      onContextMenu: DomEventListenerFunctions.HandleInputContextMenu,
      onFocus: DomEventListenerFunctions.HandleInputFocus,
      onInput: 10,
      onSelectionChange: 21,
      placeholder: 'Search',
      spellcheck: false,
      type: 62,
    },
    {
      childCount: 3,
      className: 'SearchFieldButtons',
      type: 4,
    },
    {
      ariaChecked: false,
      childCount: 1,
      className: 'SearchFieldButton',
      disabled: undefined,
      name: 'MatchCase',
      onClick: DomEventListenerFunctions.HandleButtonClick,
      role: AriaRoles.CheckBox,
      tabIndex: 0,
      title: 'Match Case',
      type: 1,
    },
    {
      childCount: 0,
      className: 'MaskIcon MaskIconCaseSensitive',
      type: 8,
    },
    {
      ariaChecked: false,
      childCount: 1,
      className: 'SearchFieldButton',
      disabled: undefined,
      name: 'MatchWholeWord',
      onClick: DomEventListenerFunctions.HandleButtonClick,
      role: AriaRoles.CheckBox,
      tabIndex: 0,
      title: 'Match Whole Word',
      type: 1,
    },
    {
      childCount: 0,
      className: 'MaskIcon MaskIconWholeWord',
      type: 8,
    },
    {
      ariaChecked: false,
      childCount: 1,
      className: 'SearchFieldButton',
      disabled: undefined,
      name: 'UseRegularExpression',
      onClick: DomEventListenerFunctions.HandleButtonClick,
      role: AriaRoles.CheckBox,
      tabIndex: 0,
      title: 'Use Regular Expression',
      type: 1,
    },
    {
      childCount: 0,
      className: 'MaskIcon MaskIconRegex',
      type: 8,
    },
    {
      childCount: 2,
      className: 'SearchHeaderDetails',
      type: 4,
    },
    {
      childCount: 1,
      className: 'ViewletSearchMessage ViewletSearchMessageIndented',
      role: AriaRoles.Status,
      type: 4,
    },
    {
      childCount: 0,
      text: 'Search results',
      type: 12,
    },
    {
      ariaLabel: 'Toggle Search Details',
      childCount: 1,
      className: 'ToggleDetails IconButton',
      name: 'ToggleSearchDetails',
      onClick: DomEventListenerFunctions.HandleButtonClick,
      role: AriaRoles.Button,
      tabIndex: 0,
      title: 'Toggle Search Details',
      type: 1,
    },
    {
      childCount: 0,
      className: 'MaskIcon MaskIconEllipsis',
      type: 4,
    },
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
      childCount: 2,
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
      ariaLabel: 'Title 1',
      ariaLevel: 0,
      ariaPosInSet: 0,
      ariaSetSize: 0,
      childCount: 4,
      className: 'TreeItem Indent-0 IndentRight-12',
      role: AriaRoles.TreeItem,
      title: 'Title 1',
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
      childCount: 1,
      className: 'Label Grow',
      type: 4,
    },
    {
      childCount: 0,
      text: 'Result 1',
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
    {
      ariaExpanded: 'true',
      ariaLabel: 'Title 2',
      ariaLevel: 0,
      ariaPosInSet: 0,
      ariaSetSize: 0,
      childCount: 4,
      className: 'TreeItem Indent-0 IndentRight-12',
      role: AriaRoles.TreeItem,
      title: 'Title 2',
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
      childCount: 1,
      className: 'Label Grow',
      type: 4,
    },
    {
      childCount: 0,
      text: 'Result 2',
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
