import { expect, test } from '@jest/globals'
import { WhenExpression } from '@lvce-editor/virtual-dom-worker'
import { getSearchResultKeyBindings } from '../src/parts/GetSearchResultsKeyBindings/GetSearchResultsKeyBindings.ts'
import * as KeyCode from '../src/parts/KeyCode/KeyCode.ts'

test('getSearchResultKeyBindings includes collapse and expand bindings', () => {
  expect(getSearchResultKeyBindings()).toContainEqual({
    command: 'Search.collapseCurrent',
    key: KeyCode.LeftArrow,
    when: WhenExpression.FocusSearchResults,
  })
  expect(getSearchResultKeyBindings()).toContainEqual({
    command: 'Search.expandCurrent',
    key: KeyCode.RightArrow,
    when: WhenExpression.FocusSearchResults,
  })
})
