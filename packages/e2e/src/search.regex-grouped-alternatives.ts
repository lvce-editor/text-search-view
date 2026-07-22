import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.regex-grouped-alternatives'

export const test: Test = async ({ expect, FileSystem, Locator, Search, SideBar, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.txt`, `cats\ndogs\nbirds`)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue('(cat|dog)s')
  const message = Locator('.Search').locator('[role="status"]')
  await expect(message).toHaveText('No results found')

  // act
  await Search.toggleUseRegularExpression()

  // assert
  await expect(message).toHaveText('2 results in 1 file')
}
