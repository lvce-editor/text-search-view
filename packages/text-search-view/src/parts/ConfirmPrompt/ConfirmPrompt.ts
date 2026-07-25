import { DialogWorker } from '@lvce-editor/rpc-registry'
import type { ConfirmPromptOptions } from '../ConfirmPromptOptions/ConfirmPromptOptions.ts'

export const prompt = (text: string, options: ConfirmPromptOptions): Promise<boolean> => {
  return DialogWorker.invoke('ConfirmPrompt.prompt', text, options)
}
