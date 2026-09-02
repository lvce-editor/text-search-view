import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.multiple-file-extensions'

export const test: Test = async ({ expect, FileSystem, Locator, Search, SideBar, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.setFiles([
    { content: `needle`, uri: `${tmpDir}/a.ts` },
    { content: `needle`, uri: `${tmpDir}/b.css` },
    { content: `needle`, uri: `${tmpDir}/c.md` },
  ])
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')

  await Search.setValue('needle')

  const message = Locator('.Search').locator('[role="status"]')
  await expect(message).toHaveText('3 results in 3 files')
}
