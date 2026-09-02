import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.case-insensitive-multiple-files'

export const test: Test = async ({ expect, FileSystem, Locator, Search, SideBar, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.setFiles([
    { content: `ALPHA`, uri: `${tmpDir}/a.txt` },
    { content: `Alpha`, uri: `${tmpDir}/b.txt` },
  ])
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')

  await Search.setValue('alpha')

  const message = Locator('.Search').locator('[role="status"]')
  await expect(message).toHaveText('2 results in 2 files')
}
