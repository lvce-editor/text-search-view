import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.regex-non-whitespace'

export const test: Test = async ({ expect, FileSystem, Locator, Search, SideBar, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.txt`, `alpha\nbeta`)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue(String.raw`^\S+$`)
  const message = Locator('.Search').locator('[role="status"]')
  await expect(message).toHaveText('No results found')

  await Search.toggleUseRegularExpression()

  await expect(message).toHaveText('2 results in 1 file')
}
