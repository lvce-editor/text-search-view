import { IconThemeWorker } from '@lvce-editor/rpc-registry'
import { launchIconThemeWorker } from '../LaunchIconThemeWorker/LaunchIconThemeWorker.ts'

export const initializeIconThemeWorker = async (): Promise<void> => {
  const rpc = await launchIconThemeWorker()
  IconThemeWorker.set(rpc)
}
