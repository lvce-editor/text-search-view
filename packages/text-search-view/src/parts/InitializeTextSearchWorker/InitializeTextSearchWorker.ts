import { TextSearchWorker } from '@lvce-editor/rpc-registry'
import * as LaunchTextSearchWorker from '../LaunchTextSearchWorker/LaunchTextSearchWorker.ts'

export const initializeTextSearchWorker = async (): Promise<void> => {
  const rpc = await LaunchTextSearchWorker.launchTextSearchWorker()
  TextSearchWorker.set(rpc)
}
