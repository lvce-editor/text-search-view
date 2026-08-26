import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { SearchState } from '../SearchState/SearchState.ts'

interface ViewletState {
  readonly currentViewletId?: string
  readonly parentUid?: number
  readonly uid: number
}

const revealInExplorerActual = async (uri: string): Promise<void> => {
  await RendererWorker.invoke('SideBar.show', 'Explorer')
  const states = (await RendererWorker.invoke('Viewlet.getAllStates')) as Record<string, ViewletState>
  const viewlets = Object.values(states)
  const sideBar = viewlets.find((viewlet) => viewlet.currentViewletId === 'Explorer')
  const explorerUid = Math.max(...viewlets.filter((viewlet) => viewlet.parentUid === sideBar!.uid).map((viewlet) => viewlet.uid))
  await RendererWorker.invoke('Viewlet.executeViewletCommand', explorerUid, 'reveal', uri)
}

export const revealInExplorer = async (state: SearchState, uri: string): Promise<SearchState> => {
  await revealInExplorerActual(uri)
  return state
}
