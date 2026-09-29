import { expect, jest, test } from '@jest/globals'
import { WhenExpression } from '@lvce-editor/constants'
import { createMockRpc } from '@lvce-editor/rpc'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as Diff2 from '../src/parts/Diff2/Diff2.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'
import * as Render2 from '../src/parts/Render2/Render2.ts'
import * as RendererProcess from '../src/parts/RendererProcess/RendererProcess.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'
import * as SearchViewStates from '../src/parts/SearchViewStates/SearchViewStates.ts'

// Setup a state in SearchViewStates
const uid = 123
const oldState = { ...CreateDefaultState.createDefaultState(), height: 100, uid, width: 100 }
const newState = { ...oldState, inputSource: InputSource.Script, value: 'new value' }
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
  const newState = { ...oldState, inputSource: InputSource.Script, value: 'direct value' }
  SearchViewStates.set(directUid, oldState, newState)

  const result = await Render2.render2(directUid, [DiffType.RenderValue])

  expect(queueCommands).toHaveBeenCalledWith(directUid, [['Viewlet.setValueByName', directUid, 'SearchValue', 'direct value']])
  expect(result).toEqual([['Viewlet.commitPending', directUid, 17]])
})

test('render2 leaves focus context management with the renderer worker without queuing an empty renderer transaction', async () => {
  const queueCommands = jest.fn((_uid: number, _commands: readonly unknown[]) => 23)
  RendererProcess.set(createMockRpc({ commandMap: { 'Viewlet.queueCommands': queueCommands } }))
  const directUid = 789
  const oldState = { ...CreateDefaultState.createDefaultState(), focus: WhenExpression.FocusSearchResults, uid: directUid }
  const newState = { ...oldState, focused: true }
  SearchViewStates.set(directUid, oldState, newState)

  const result = await Render2.render2(directUid, [DiffType.RenderFocusContext])

  expect(queueCommands).not.toHaveBeenCalled()
  expect(result).toEqual([['Viewlet.setFocusContext', directUid, WhenExpression.FocusSearch, WhenExpression.FocusSearchResults]])
})

test('renders replace expansion that arrives after the diff was computed', async () => {
  const queueCommands = jest.fn((_uid: number, _commands: readonly unknown[]) => 31)
  RendererProcess.set(createMockRpc({ commandMap: { 'Viewlet.queueCommands': queueCommands } }))
  const raceUid = 790
  const state = {
    ...CreateDefaultState.createDefaultState(),
    initial: false,
    inputSource: InputSource.Script,
    uid: raceUid,
    workspaceUri: 'file:///workspace',
  }
  const pending = { ...state, value: 'needle' }
  SearchViewStates.set(raceUid, state, pending)
  const diffResult = Diff2.diff2(raceUid)
  expect(diffResult).toEqual([DiffType.RenderValue])

  SearchViewStates.set(raceUid, state, { ...pending, flags: state.flags | SearchFlags.ReplaceExpanded })
  const result = await Render2.render2(raceUid, diffResult)

  expect(queueCommands).toHaveBeenCalledWith(raceUid, [
    ['Viewlet.setPatches', raceUid, expect.any(Array)],
    ['Viewlet.setValueByName', raceUid, 'SearchValue', 'needle'],
  ])
  expect(queueCommands.mock.calls[0][1][0]).not.toEqual(['Viewlet.setPatches', raceUid, []])
  expect(result).toEqual([['Viewlet.commitPending', raceUid, 31]])
})
