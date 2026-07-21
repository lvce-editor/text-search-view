import { PlatformType } from '@lvce-editor/constants'
import { SearchProcess } from '@lvce-editor/rpc-registry'
import { launchSearchProcessElectron } from '../LaunchSearchProcessElectron/LaunchSearchProcessElectron.ts'
import { launchSearchProcessNode } from '../LaunchSearchProcessNode/LaunchSearchProcessNode.ts'

export const initializeSearchProcess = async (platform: number): Promise<void> => {
  if (platform === PlatformType.Electron) {
    const rpc = await launchSearchProcessElectron()
    SearchProcess.set(rpc)
  } else if (platform === PlatformType.Remote) {
    const rpc = await launchSearchProcessNode()
    SearchProcess.set(rpc)
  }
}
