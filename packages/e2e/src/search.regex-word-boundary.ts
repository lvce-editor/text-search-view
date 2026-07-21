import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.regex-word-boundary'

export const test: Test = async ({ expect, FileSystem, Locator, Search, SideBar, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.txt`, `cat\nconcatenate\ncatfish`)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue(String.raw`\bcat\b`)
  const viewletSearch = Locator('.Search')
  const message = viewletSearch.locator('[role="status"]')
  await expect(message).toHaveText('No results found')

  // act
  await Search.toggleUseRegularExpression()

  // assert
  await expect(message).toHaveText('1 result in 1 file')
}
