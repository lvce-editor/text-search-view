import { expect, test } from '@jest/globals'
import { WhenExpression } from '@lvce-editor/virtual-dom-worker'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as FocusElement from '../src/parts/FocusElement/FocusElement.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'

test('focusElement - sets correct focus state', () => {
  const state: SearchState = CreateDefaultState.createDefaultState()
  const focusKey = WhenExpression.FocusSearchInput

  const result = FocusElement.focusElement(state, focusKey)

  expect(result).toEqual({
    ...state,
    focus: focusKey,
    focusSource: InputSource.Script,
  })
})
