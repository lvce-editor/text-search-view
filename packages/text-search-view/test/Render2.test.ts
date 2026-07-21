import { test, expect } from '@jest/globals'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'
import { render2 } from '../src/parts/Render2/Render2.ts'
import * as SearchViewStates from '../src/parts/SearchViewStates/SearchViewStates.ts'

// Setup a state in SearchViewStates
const uid = 123
const oldState = { ...CreateDefaultState.createDefaultState(), height: 100, uid, width: 100 }
const newState = { ...oldState, value: 'new value' }
SearchViewStates.set(uid, oldState, newState)

test('render2 returns correct commands for RenderValue diff', () => {
  const diffResult = [DiffType.RenderValue]
  const result = render2(uid, diffResult)
  expect(result).toEqual([['Viewlet.setValueByName', 'SearchValue', 'new value']])
})
