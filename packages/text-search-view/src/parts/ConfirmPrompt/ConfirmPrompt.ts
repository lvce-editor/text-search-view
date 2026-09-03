import { DialogWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import type { ConfirmPromptOptions } from '../ConfirmPromptOptions/ConfirmPromptOptions.ts'

const missingDialogWorkerRelay = 'Command "SendMessagePortToExtensionHostWorker.sendMessagePortToDialogWorker" not found'

export const prompt = async (options: ConfirmPromptOptions): Promise<boolean> => {
  try {
    return await DialogWorker.invoke('ConfirmPrompt.prompt2', options)
  } catch (error) {
    if (!String(error).includes(missingDialogWorkerRelay)) {
      throw error
    }
    const { confirmMessage, text, title } = options
    return RendererWorker.invoke('ConfirmPrompt.prompt', text, { confirmMessage, title })
  }
}
