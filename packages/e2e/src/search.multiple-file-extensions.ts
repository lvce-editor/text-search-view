import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.multiple-file-extensions'

export const test: Test = async ({ expect, FileSystem, Locator, Search, SideBar, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/a.ts`, `needle`)
  await FileSystem.writeFile(`${tmpDir}/b.css`, `needle`)
  await FileSystem.writeFile(`${tmpDir}/c.md`, `needle`)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')

  await Search.setValue('needle')

  const message = Locator('.Search').locator('[role="status"]')
  await expect(message).toHaveText('3 results in 3 files')
}
