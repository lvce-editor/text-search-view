import { expect, jest, test } from '@jest/globals'
import { WhenExpression } from '@lvce-editor/constants'
import { createMockRpc } from '@lvce-editor/rpc'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'
import * as Render2 from '../src/parts/Render2/Render2.ts'
import * as RendererProcess from '../src/parts/RendererProcess/RendererProcess.ts'
import * as SearchViewStates from '../src/parts/SearchViewStates/SearchViewStates.ts'

// Setup a state in SearchViewStates
const uid = 123
const oldState = { ...CreateDefaultState.createDefaultState(), height: 100, uid, width: 100 }
const newState = { ...oldState, value: 'new value' }
SearchViewStates.set(uid, oldState, newState)

test('render2 returns correct commands for RenderValue diff', () => {
  const diffResult = [DiffType.RenderValue]
  const result = Render2.render2(uid, diffResult)
  expect(result).toEqual([['Viewlet.setValueByName', uid, 'SearchValue', 'new value']])
})

test('render2 queues renderer commands and returns a lightweight commit marker', async () => {
  const queueCommands = jest.fn((_uid: number, _commands: readonly unknown[]) => 17)
  RendererProcess.set(createMockRpc({ commandMap: { 'Viewlet.queueCommands': queueCommands } }))
  const directUid = 456
  const oldState = { ...CreateDefaultState.createDefaultState(), uid: directUid }
  const newState = { ...oldState, value: 'direct value' }
  SearchViewStates.set(directUid, oldState, newState)

  const result = await Render2.render2(directUid, [DiffType.RenderValue])

  expect(queueCommands).toHaveBeenCalledWith(directUid, [['Viewlet.setValueByName', directUid, 'SearchValue', 'direct value']])
  expect(result).toEqual([['Viewlet.commitPending', directUid, 17]])
})

test('render2 leaves focus context management with the renderer worker', async () => {
  const queueCommands = jest.fn((_uid: number, _commands: readonly unknown[]) => 23)
  RendererProcess.set(createMockRpc({ commandMap: { 'Viewlet.queueCommands': queueCommands } }))
  const directUid = 789
  const oldState = { ...CreateDefaultState.createDefaultState(), uid: directUid }
  const newState = { ...oldState, focus: WhenExpression.FocusSearchResults }
  SearchViewStates.set(directUid, oldState, newState)

  const result = await Render2.render2(directUid, [DiffType.RenderFocusContext])

  expect(queueCommands).toHaveBeenCalledWith(directUid, [])
  expect(result).toEqual([
    ['Viewlet.setFocusContext', directUid, WhenExpression.FocusSearch, WhenExpression.FocusSearchResults],
    ['Viewlet.commitPending', directUid, 23],
  ])
})
