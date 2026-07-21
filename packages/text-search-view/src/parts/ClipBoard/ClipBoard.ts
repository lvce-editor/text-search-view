import { RendererWorker } from '@lvce-editor/rpc-registry'

export const writeText = async (text: string): Promise<void> => {
  await RendererWorker.writeClipBoardText(text)
}

export const readText = async (): Promise<string> => {
  return await RendererWorker.invoke('ClipBoard.readText')
}
