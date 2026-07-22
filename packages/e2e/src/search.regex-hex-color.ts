import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.regex-hex-color'

export const test: Test = async ({ expect, FileSystem, Locator, Search, SideBar, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.txt`, `#1a2B3c\n#xyzxyz`)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue('^#[0-9a-fA-F]{6}$')
  const message = Locator('.Search').locator('[role="status"]')
  await expect(message).toHaveText('No results found')

  // act
  await Search.toggleUseRegularExpression()

  // assert
  await expect(message).toHaveText('1 result in 1 file')
}
