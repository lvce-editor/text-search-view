import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.apostrophe'

export const test: Test = async ({ expect, FileSystem, Locator, Search, SideBar, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.txt`, `don't stop`)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')

  // act
  await Search.setValue("don't")

  // assert
  const message = Locator('.Search').locator('[role="status"]')
  await expect(message).toHaveText('1 result in 1 file')
}
