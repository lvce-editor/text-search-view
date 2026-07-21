import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.regex-wildcard'

export const test: Test = async ({ expect, FileSystem, Locator, Search, SideBar, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.txt`, `cat\ncot\ncut`)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue('c.t')
  const viewletSearch = Locator('.Search')
  const message = viewletSearch.locator('[role="status"]')
  await expect(message).toHaveText('No results found')

  // act
  await Search.toggleUseRegularExpression()

  // assert
  await expect(message).toHaveText('3 results in 1 file')
}
