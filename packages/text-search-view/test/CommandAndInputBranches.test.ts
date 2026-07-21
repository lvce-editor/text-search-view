import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleActionClick } from '../src/parts/HandleActionClick/HandleActionClick.ts'
import { handleExcludeInput } from '../src/parts/HandleExcludeInput/HandleExcludeInput.ts'
import { handleIncludeInput } from '../src/parts/HandleIncludeInput/HandleIncludeInput.ts'
import { handleInput } from '../src/parts/HandleInput/HandleInput.ts'
import { handleReplaceInput } from '../src/parts/HandleReplaceInput/HandleReplaceInput.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'

test('handleActionClick dispatches every action and preserves unknown actions', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Main.openUri': () => undefined,
    'Preferences.get': () => ({ '**/dist': true }),
  })
  const state = createDefaultState()

  const clearedState = await handleActionClick({ ...state, value: 'search' }, InputName.ClearAll)
  expect(clearedState.value).toBe('')
  expect(await handleActionClick(state, InputName.CollapseAll)).toBe(state)
  expect(await handleActionClick(state, InputName.OpenSearchEditor)).toBe(state)
  const refreshedState = await handleActionClick(state, InputName.Refresh)
  expect(refreshedState.loaded).toBe(true)
  expect(refreshedState.defaultExcludes).toEqual(['**/dist'])
  expect(await handleActionClick(state, InputName.ViewAsTree)).toBe(state)
  expect(await handleActionClick(state, 'Unknown')).toBe(state)
  expect(mockRpc.invocations).toEqual([
    ['Main.openUri', expect.any(String), true, {}],
    ['Preferences.get', 'search.exclude'],
  ])
})

test('input handlers use the script input source by default', async () => {
  const state = createDefaultState()

  const excludeState = await handleExcludeInput(state, 'dist')
  const includeState = await handleIncludeInput(state, '*.ts')
  const inputState = await handleInput(state, '')
  const replaceState = await handleReplaceInput(state, 'value')
  expect(excludeState.inputSource).toBe(InputSource.Script)
  expect(includeState.inputSource).toBe(InputSource.Script)
  expect(inputState.inputSource).toBe(InputSource.Script)
  expect(replaceState.inputSource).toBe(InputSource.Script)
})
