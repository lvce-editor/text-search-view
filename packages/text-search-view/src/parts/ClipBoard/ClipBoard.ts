import { ClipBoardWorker } from '@lvce-editor/rpc-registry'

export const writeText = async (text: string): Promise<void> => {
  await ClipBoardWorker.writeText(text)
}

export const readText = async (): Promise<string> => {
  return await ClipBoardWorker.readText()
}
