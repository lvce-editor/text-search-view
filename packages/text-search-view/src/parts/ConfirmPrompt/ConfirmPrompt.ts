import { DialogWorker } from '@lvce-editor/rpc-registry'

export const prompt = async (text: string, options: DialogWorker.ConfirmPromptOptions): Promise<boolean> => {
  return DialogWorker.prompt(text, options)
}
