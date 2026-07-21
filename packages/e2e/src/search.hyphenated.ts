import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.hyphenated'

export const skip = 1

export const test: Test = async ({ expect, FileSystem, Locator, Search, SideBar, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.txt`, 'tic-tac-toe')
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')

  await Search.setValue('tic-tac')

  const viewletSearch = Locator('.Search')
  const message = viewletSearch.locator('[role="status"]')
  await expect(message).toHaveText('1 result in 1 file')
}
