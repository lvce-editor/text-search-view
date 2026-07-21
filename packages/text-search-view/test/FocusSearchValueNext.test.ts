import { expect, test } from '@jest/globals'
import { WhenExpression } from '@lvce-editor/virtual-dom-worker'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as FocusSearchValueNext from '../src/parts/FocusSearchValueNext/FocusSearchValueNext.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'

test('focusSearchValueNext - with replace expanded', () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    flags: SearchFlags.ReplaceExpanded,
  }

  const result = FocusSearchValueNext.focusSearchValueNext(state)

  expect(result).toEqual({
    ...state,
    focus: WhenExpression.FocusSearchReplaceInput,
    focusSource: InputSource.Script,
  })
})

test('focusSearchValueNext - without replace expanded', () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    flags: 0,
  }

  const result = FocusSearchValueNext.focusSearchValueNext(state)

  expect(result).toEqual({
    ...state,
    focus: WhenExpression.FocusSearchMatchCase,
    focusSource: InputSource.User,
  })
})
