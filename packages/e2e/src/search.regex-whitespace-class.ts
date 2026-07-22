import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.regex-whitespace-class'

export const test: Test = async ({ expect, FileSystem, Locator, Search, SideBar, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.txt`, `hello world\nhelloworld`)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue(String.raw`hello\sworld`)
  const message = Locator('.Search').locator('[role="status"]')
  await expect(message).toHaveText('No results found')

  // act
  await Search.toggleUseRegularExpression()

  // assert
  await expect(message).toHaveText('1 result in 1 file')
}
