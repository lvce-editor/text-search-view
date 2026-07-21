import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.replace-disabled-with-no-results'

export const test: Test = async ({ expect, FileSystem, Locator, Search, SideBar, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, `abc`)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  const viewletSearch = Locator('.Search')

  // act
  await Search.setValue('abcd')

  // assert
  const message = viewletSearch.locator('[role="status"]')
  await expect(message).toHaveText('No results found')
  await Search.setReplaceValue('d')
  // TODO
  // await expect(viewletSearch.locator('[name="ReplaceAll"]')).toHaveAttribute('disabled', '')
}
