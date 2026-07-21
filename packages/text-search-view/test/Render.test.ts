import { expect, test } from '@jest/globals'
import { WhenExpression } from '@lvce-editor/virtual-dom-worker'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'
import * as Render from '../src/parts/Render/Render.ts'
import * as SearchViewStates from '../src/parts/SearchViewStates/SearchViewStates.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

test('doRender - no changes returns empty commands', () => {
  const oldState = { ...CreateDefaultState.createDefaultState(), uid: 1 }
  SearchViewStates.set(1, oldState, oldState)

  const commands = Render.doRender(1)
  expect(commands).toEqual([])
})

test('doRender - renders items when changed', () => {
  const oldState = { ...CreateDefaultState.createDefaultState(), uid: 1 }
  const newState = {
    ...oldState,
    fileCount: 1,
    items: [{ end: 0, lineNumber: 0, start: 0, text: 'item1', type: TextSearchResultType.File }],
    listItems: [{ end: 0, lineNumber: 0, start: 0, text: 'item1', type: TextSearchResultType.File }],
    value: 'test',
  }
  SearchViewStates.set(1, oldState, newState)

  const commands = Render.doRender(1)
  expect(commands).toEqual([
    ['Viewlet.setPatches', 1, expect.any(Array)],
    ['Viewlet.setCss', 1, expect.any(String)],
  ])
})

test('doRender - renders focus when changed', () => {
  const oldState = { ...CreateDefaultState.createDefaultState(), uid: 1 }
  const newState = {
    ...oldState,
    focus: WhenExpression.FocusSearchInput,
    focusSource: InputSource.Script,
  }
  SearchViewStates.set(1, oldState, newState)

  const commands = Render.doRender(1)
  expect(commands).toHaveLength(3)
  expect(commands[1][0]).toBe('Viewlet.focusElementByName')
  expect(commands[1][1]).toBe(1)
  expect(commands[1][2]).toBe('SearchValue')
})

test('doRender - renders value when changed', () => {
  const oldState = { ...CreateDefaultState.createDefaultState(), uid: 1 }
  const newState = {
    ...oldState,
    inputSource: InputSource.Script,
    value: 'newValue',
  }
  SearchViewStates.set(1, oldState, newState)

  const commands = Render.doRender(1)
  expect(commands).toHaveLength(1)
  expect(commands[0][0]).toBe('Viewlet.setValueByName')
  expect(commands[0][1]).toBe('SearchValue')
  expect(commands[0][2]).toBe('newValue')
})
