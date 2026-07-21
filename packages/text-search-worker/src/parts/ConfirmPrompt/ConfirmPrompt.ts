import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ConfirmPromptOptions } from '../ConfirmPromptOptions/ConfirmPromptOptions.ts'

export const prompt = (text: string, options: ConfirmPromptOptions): Promise<boolean> => {
  return RendererWorker.invoke('ConfirmPrompt.prompt', text, options)
}
