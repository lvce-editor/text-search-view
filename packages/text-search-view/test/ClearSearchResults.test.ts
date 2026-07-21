import { expect, test } from '@jest/globals'
import { WhenExpression } from '@lvce-editor/virtual-dom-worker'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as ClearSearchResults from '../src/parts/ClearSearchResults/ClearSearchResults.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

test('clearSearchResults - clears state and focuses search input', () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    items: [
      { end: 0, lineNumber: 0, start: 0, text: 'file1.txt', type: TextSearchResultType.File },
      { end: 0, lineNumber: 0, start: 0, text: 'match1', type: TextSearchResultType.Match },
    ],
    maxLineY: 20,
    message: 'test message',
    minLineY: 10,
    workspacePath: 'test',
  }

  const result = ClearSearchResults.clearSearchResults(state)

  expect(result).toEqual({
    ...state,
    focus: WhenExpression.FocusSearchInput,
    focusSource: InputSource.Script,
    inputSource: InputSource.Script,
    items: [],
    maxLineY: 0,
    message: '',
    minLineY: 0,
    replacement: '',
    value: '',
  })
})
