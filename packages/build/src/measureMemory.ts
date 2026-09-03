import { measureMemory } from '@lvce-editor/measure-memory'
import { playwrightPath, threshold, workerPath, instantiations, instantiationsPath } from './measureMemoryConfig.ts'

const main = async (): Promise<void> => {
  await measureMemory({
    playwrightPath,
    workerPath,
    threshold,
    instantiations,
    instantiationsPath,
  })
}

main()
