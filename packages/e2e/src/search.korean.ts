import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.korean'

export const test: Test = async ({ expect, FileSystem, Locator, Search, SideBar, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.txt`, `안녕하세요 세계`)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')

  // act
  await Search.setValue('세계')

  // assert
  const message = Locator('.Search').locator('[role="status"]')
  await expect(message).toHaveText('1 result in 1 file')
}
