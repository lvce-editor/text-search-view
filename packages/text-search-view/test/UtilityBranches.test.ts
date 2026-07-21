import { expect, test } from '@jest/globals'
import { WhenExpression } from '@lvce-editor/virtual-dom-worker'
import { convertSearchResults } from '../src/parts/ConvertSearchResults/ConvertSearchResults.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { createViewModel } from '../src/parts/CreateViewModel/CreateViewModel.ts'
import { isEqual as isReplaceValueEqual } from '../src/parts/DiffReplaceValue/DiffReplaceValue.ts'
import { getActionButtonVirtualDom } from '../src/parts/GetActionButtonVirtualDom/GetActionButtonVirtualDom.ts'
import { getActionVirtualDom } from '../src/parts/GetActionVirtualDom/GetActionVirtualDom.ts'
import { getFileName } from '../src/parts/GetFileName/GetFileName.ts'
import { getInputActionsExclude } from '../src/parts/GetInputActionsExclude/GetInputActionsExclude.ts'
import { getInputActionsInclude } from '../src/parts/GetInputActionsInclude/GetInputActionsInclude.ts'
import { getInputActionsInput } from '../src/parts/GetInputActionsInput/GetInputActionsInput.ts'
import { getMissingIconRequests } from '../src/parts/GetMissingIconRequests/GetMissingIconRequests.ts'
import { getNextFocus } from '../src/parts/GetNextFocus/GetNextFocus.ts'
import { getReplacePlaceholder } from '../src/parts/GetReplacePlaceholder/GetReplacePlaceholder.ts'
import { getDisplayResult } from '../src/parts/GetSearchDisplayResult/GetSearchDisplayResult.ts'
import { getChildCount } from '../src/parts/GetSearchDisplayResultChildCount/GetSearchDisplayResultChildCount.ts'
import { getSearchPlaceholder } from '../src/parts/GetSearchPlaceholder/GetSearchPlaceholder.ts'
import { getTextSearchResultCounts } from '../src/parts/GetTextSearchResultCounts/GetTextSearchResultCounts.ts'
import * as InputActionFlag from '../src/parts/InputActionFlag/InputActionFlag.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

const file = {
  end: 0,
  lineNumber: 0,
  start: 0,
  text: 'src/file.ts',
  type: TextSearchResultType.File,
}

test('convertSearchResults ignores unknown result types', () => {
  expect(convertSearchResults([{ ...file, type: 99 }])).toEqual([])
})

test('createViewModel supports rendering folder paths', () => {
  const result = createViewModel({
    ...createDefaultState(),
    renderFolderPaths: true,
  })
  expect(result.displayResults).toEqual([])
})

test('createViewModel computes non-zero scrollbar values', () => {
  const result = createViewModel({
    ...createDefaultState(),
    deltaY: 25,
    finalDeltaY: 100,
    height: 200,
    scrollBarHeight: 20,
  })
  expect(result.scrollBarValue).toBe(25)
  expect(result.scrollBarY).toBeGreaterThan(0)
})

test('diff replacement detects a programmatic replacement change', () => {
  const oldState = {
    ...createDefaultState(),
    replacement: 'old',
  }
  const newState = {
    ...oldState,
    inputSource: InputSource.Script,
    replacement: 'new',
  }
  expect(isReplaceValueEqual(oldState, newState)).toBe(false)
})

test('action virtual DOM supports disabled and unknown actions', () => {
  const action = {
    command: 'Search.test',
    enabled: false,
    icon: 'Search',
    id: 'test',
    label: 'Test',
    type: 1,
  }
  expect(getActionButtonVirtualDom(action)[0]).toMatchObject({
    className: 'IconButton IconButtonDisabled',
  })
  expect(getActionVirtualDom({ ...action, type: 99 })).toEqual([])
})

test('getFileName preserves a bare file name', () => {
  expect(getFileName('file.ts')).toBe('file.ts')
  expect(getFileName('src/file.ts')).toBe('file.ts')
})

test('input actions expose enabled flags', () => {
  expect(getInputActionsExclude(SearchFlags.UseIgnoreFiles).inside[0].flag).toBe(InputActionFlag.CheckBoxEnabled)
  expect(getInputActionsInclude(SearchFlags.OpenEditors).inside[0].flag).toBe(InputActionFlag.CheckBoxEnabled)

  const actions = getInputActionsInput(SearchFlags.MatchCase | SearchFlags.MatchWholeWord | SearchFlags.UseRegularExpression)
  expect(actions.inside.map(({ flag }) => flag)).toEqual([
    InputActionFlag.CheckBoxEnabled,
    InputActionFlag.CheckBoxEnabled,
    InputActionFlag.CheckBoxEnabled,
  ])
})

test('getMissingIconRequests omits cached files', () => {
  expect(getMissingIconRequests([file], { 'src/file.ts': 'icon' })).toEqual([])
})

test('getNextFocus preserves an unknown focus value', () => {
  expect(getNextFocus(999, 0)).toBe(999)
})

test('getNextFocus moves from the replace toggle to the search input', () => {
  expect(getNextFocus(WhenExpression.FocusToggleReplace, 0)).toBe(WhenExpression.FocusSearchInput)
})

test('history placeholders are used for their focused inputs', () => {
  expect(getReplacePlaceholder(WhenExpression.FocusSearchReplaceInput)).toBe('Replace (⇅ for history)')
  expect(getSearchPlaceholder(WhenExpression.FocusSearchInput)).toBe('Search (⇅ for history)')
})

test('getChildCount supports a plain result without optional children', () => {
  expect(getChildCount('', 0, '')).toBe(2)
})

test('getDisplayResult rejects unknown result types', () => {
  expect(() => getDisplayResult([{ ...file, type: 99 }], [], 0, 1, 0, '', -1, [], false, 0, [])).toThrow('unexpected search result type')
})

test('getTextSearchResultCounts ignores unknown result types', () => {
  expect(getTextSearchResultCounts([{ ...file, type: 99 }])).toEqual({
    fileCount: 0,
    resultCount: 0,
  })
})
