import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { revealInExplorer } from '../src/parts/RevealInExplorer/RevealInExplorer.ts'

test('shows Explorer and reveals the uri in the newest Explorer view', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'SideBar.show': async (): Promise<void> => {},
    'Viewlet.executeViewletCommand': async (): Promise<void> => {},
    'Viewlet.getAllStates': async (): Promise<object> => ({
      explorerNew: { parentUid: 4, uid: 12 },
      explorerOld: { parentUid: 4, uid: 8 },
      layout: { sideBarId: 4, uid: 2 },
      sideBar: { currentViewletId: 'Explorer', uid: 4 },
    }),
  })
  const state = createDefaultState()
  const uri = '/workspace/src/file.ts'

  const newState = await revealInExplorer(state, uri)

  expect(newState).toBe(state)
  expect(mockRpc.invocations).toEqual([['SideBar.show', 'Explorer'], ['Viewlet.getAllStates'], ['Viewlet.executeViewletCommand', 12, 'reveal', uri]])
})
