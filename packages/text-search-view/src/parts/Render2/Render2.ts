import { ViewletCommand } from '@lvce-editor/constants'
import * as ApplyRender from '../ApplyRender/ApplyRender.ts'
import * as Diff from '../Diff/Diff.ts'
import * as RendererProcess from '../RendererProcess/RendererProcess.ts'
import * as SearchViewStates from '../SearchViewStates/SearchViewStates.ts'

const renderDirect = async (uid: number, commands: readonly any[]): Promise<readonly any[]> => {
  const rendererWorkerCommands = commands.filter((command) => command[0] === ViewletCommand.SetFocusContext)
  const rendererProcessCommands = commands.filter((command) => command[0] !== ViewletCommand.SetFocusContext)
  if (rendererProcessCommands.length === 0) {
    return rendererWorkerCommands
  }
  const transactionId = await RendererProcess.invoke('Viewlet.queueCommands', uid, rendererProcessCommands)
  return [...rendererWorkerCommands, ['Viewlet.commitPending', uid, transactionId]]
}

export const render2 = (uid: number, diffResult: readonly number[]): readonly any[] | Promise<readonly any[]> => {
  const { newState, oldState } = SearchViewStates.get(uid)
  // Commands can change state after diff2 returns and before this render request arrives.
  const currentDiff = [...new Set([...Diff.diff(oldState, newState), ...diffResult])]
  SearchViewStates.set(uid, newState, newState)
  const commands = ApplyRender.applyRender(oldState, newState, currentDiff)
  if (!RendererProcess.isConnected()) {
    return commands
  }
  return renderDirect(uid, commands)
}
