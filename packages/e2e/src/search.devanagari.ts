import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.devanagari'

export const test: Test = async ({ expect, FileSystem, Locator, Search, SideBar, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.txt`, `नमस्ते दुनिया`)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')

  // act
  await Search.setValue('दुनिया')

  // assert
  const message = Locator('.Search').locator('[role="status"]')
  await expect(message).toHaveText('1 result in 1 file')
}
