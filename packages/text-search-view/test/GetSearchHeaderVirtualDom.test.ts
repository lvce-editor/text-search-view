import { expect, test } from '@jest/globals'
import { AriaRoles } from '@lvce-editor/constants'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetSearchHeaderVirtualDom from '../src/parts/GetSearchHeaderVirtualDom/GetSearchHeaderVirtualDom.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'

test('getSearchHeaderVirtualDom - with no flags', () => {
  const flags = 0
  const message = ''
  const errorMessage = ''
  const matchCount = 0
  const focus = 0
  const dom = GetSearchHeaderVirtualDom.getSearchHeaderVirtualDom(flags, message, errorMessage, matchCount, focus, '')
  expect(dom).toEqual([
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
      text: '',
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
  ])
})

test('getSearchHeaderVirtualDom - with limit hit warning', () => {
  const flags = 0
  const message = ''
  const errorMessage = ''
  const matchCount = 0
  const focus = 0
  const limitHitWarning = 'Too many results found'
  const dom = GetSearchHeaderVirtualDom.getSearchHeaderVirtualDom(flags, message, errorMessage, matchCount, focus, limitHitWarning)
  expect(dom[0].childCount).toBe(3)
  expect(dom.slice(-2)).toEqual([
    {
      childCount: 1,
      className: 'SearchWarningMessage',
      type: 4,
    },
    {
      childCount: 0,
      text: limitHitWarning,
      type: 12,
    },
  ])
})

test.skip('getSearchHeaderVirtualDom - with details expanded', () => {
  const flags = SearchFlags.DetailsExpanded
  const message = ''
  const errorMessage = ''
  const matchCount = 1
  const focus = 0
  const limitHitWarning = ''
  const dom = GetSearchHeaderVirtualDom.getSearchHeaderVirtualDom(flags, message, errorMessage, matchCount, focus, limitHitWarning)
  expect(dom[0].childCount).toBe(4)
  expect(dom[dom.length - 7].className).toBe('SearchHeaderDetails')
  expect(dom[dom.length - 6].text).toBe('files to include')
  expect(dom[dom.length - 4].text).toBe('files to exclude')
})

test.skip('getSearchHeaderVirtualDom - with replace and details expanded', () => {
  const flags = SearchFlags.DetailsExpanded | SearchFlags.ReplaceExpanded
  const message = ''
  const errorMessage = ''
  const matchCount = 1
  const focus = 0
  const limitHitWarning = ''
  const dom = GetSearchHeaderVirtualDom.getSearchHeaderVirtualDom(flags, message, errorMessage, matchCount, focus, limitHitWarning)
  expect(dom[0].childCount).toBe(4)
  expect(flags & SearchFlags.DetailsExpanded).toBeTruthy()
  expect(flags & SearchFlags.ReplaceExpanded).toBeTruthy()
})
