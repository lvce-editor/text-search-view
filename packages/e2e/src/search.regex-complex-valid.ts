import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.regex-complex-valid'

export const test: Test = async ({ expect, FileSystem, Locator, Search, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.txt`, `foo 1\nbar 22\nbaz`)
  await Workspace.setPath(tmpDir)
  await Search.open()
  await Search.setValue(String.raw`(foo|bar)+\s\d+`)
  await Search.setReplaceValue('')
  const viewletSearch = Locator('.Search')
  const message = viewletSearch.locator('[role="status"]')
  await expect(message).toHaveText('No results found')

  // act
  await Search.toggleUseRegularExpression()

  // assert
  await expect(message).toHaveText('2 results in 1 file')
}
