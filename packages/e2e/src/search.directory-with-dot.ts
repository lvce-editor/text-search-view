import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.directory-with-dot'

export const test: Test = async ({ expect, FileSystem, Locator, Search, SideBar, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.mkdir(`${tmpDir}/config.d`)
  await FileSystem.writeFile(`${tmpDir}/config.d/test.txt`, `needle`)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')

  await Search.setValue('needle')

  const message = Locator('.Search').locator('[role="status"]')
  await expect(message).toHaveText('1 result in 1 file')
}
