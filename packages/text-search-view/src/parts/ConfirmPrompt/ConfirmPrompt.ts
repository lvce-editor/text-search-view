import { DialogWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import type { ConfirmPromptOptions } from '../ConfirmPromptOptions/ConfirmPromptOptions.ts'

const missingDialogWorkerRelay = 'Command "SendMessagePortToExtensionHostWorker.sendMessagePortToDialogWorker" not found'

export const prompt = async (text: string, options: ConfirmPromptOptions): Promise<boolean> => {
  try {
    return await DialogWorker.invoke('ConfirmPrompt.prompt', text, options)
  } catch (error) {
    if (!String(error).includes(missingDialogWorkerRelay)) {
      throw error
    }
    return RendererWorker.invoke('ConfirmPrompt.prompt', text, options)
  }
}
