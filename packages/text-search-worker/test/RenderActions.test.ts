import { expect, test } from '@jest/globals'
import { AriaRoles } from '@lvce-editor/constants'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as RenderActions from '../src/parts/RenderActions/RenderActions.ts'
import * as SearchViewStates from '../src/parts/SearchViewStates/SearchViewStates.ts'

test.skip('renderActions - returns empty array when states are same', () => {
  const state = { ...CreateDefaultState.createDefaultState(), uid: 1 }
  SearchViewStates.set(1, state, state)
  // @ts-ignore
  const result = RenderActions.renderActions(1)
  expect(result).toEqual([])
})

test.skip('renderActions - returns virtual dom when states differ', () => {
  const oldState = { ...CreateDefaultState.createDefaultState(), uid: 1 }
  const newState: SearchState = {
    ...oldState,
    items: [
      {
        end: 0,
        lineNumber: 0,
        start: 0,
        text: 'item1',
        type: 1,
      },
    ],
  }
  SearchViewStates.set(1, oldState, newState)
  // @ts-ignore
  const result = RenderActions.renderActions(1)
  expect(result).toHaveLength(1)
  expect(result[0]).toEqual({
    childCount: 0,
    className: 'Actions',
    role: AriaRoles.ToolBar,
    type: 4,
  })
})
