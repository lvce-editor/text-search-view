import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.update-query-no-results'

export const test: Test = async ({ expect, FileSystem, Locator, Search, SideBar, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.txt`, `alpha`)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue('alpha')
  const message = Locator('.Search').locator('[role="status"]')
  await expect(message).toHaveText('1 result in 1 file')

  // act
  await Search.setValue('beta')

  // assert
  await expect(message).toHaveText('No results found')
}
