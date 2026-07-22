import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.nested-directory-with-spaces'

export const test: Test = async ({ expect, FileSystem, Locator, Search, SideBar, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.mkdir(`${tmpDir}/project files`)
  await FileSystem.writeFile(`${tmpDir}/project files/test.txt`, `needle`)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')

  // act
  await Search.setValue('needle')

  // assert
  const message = Locator('.Search').locator('[role="status"]')
  await expect(message).toHaveText('1 result in 1 file')
}
