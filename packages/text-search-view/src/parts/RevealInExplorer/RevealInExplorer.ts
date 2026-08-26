import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { SearchState } from '../SearchState/SearchState.ts'

interface ViewletState {
  readonly currentViewletId?: string
  readonly parentUid?: number
  readonly uid: number
}

interface TimerGlobal {
  readonly setTimeout: (callback: () => void, delay: number) => number
}

const timerGlobal = globalThis as unknown as TimerGlobal

const revealInExplorerActual = async (uri: string): Promise<void> => {
  await RendererWorker.invoke('SideBar.show', 'Explorer')
  const states = (await RendererWorker.invoke('Viewlet.getAllStates')) as Record<string, ViewletState>
  const viewlets = Object.values(states)
  const sideBar = viewlets.find((viewlet) => viewlet.currentViewletId === 'Explorer')
  const explorerUid = Math.max(...viewlets.filter((viewlet) => viewlet.parentUid === sideBar!.uid).map((viewlet) => viewlet.uid))
  await RendererWorker.invoke('Viewlet.executeViewletCommand', explorerUid, 'reveal', uri)
}

export const revealInExplorer = (state: SearchState, uri: string): SearchState => {
  timerGlobal.setTimeout(() => {
    void revealInExplorerActual(uri)
  }, 0)
  return state
}
