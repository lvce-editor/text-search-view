import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.clear-limit-hit-on-empty-input'

export const test: Test = async ({ expect, FileSystem, Locator, Search, SideBar, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, `abc\n`.repeat(10))
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setLimit(5)
  await Search.setValue('ab')

  const warningMessage = Locator('.SearchWarningMessage')
  await expect(warningMessage).toBeVisible()

  // act
  await Search.setValue('')

  // assert
  await expect(warningMessage).toHaveCount(0)
}
