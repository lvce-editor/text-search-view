import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.regex-optional-protocol'

export const test: Test = async ({ expect, FileSystem, Locator, Search, SideBar, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.txt`, `http://example.com\nhttps://example.com`)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue(String.raw`^https?://example\.com$`)
  const message = Locator('.Search').locator('[role="status"]')
  await expect(message).toHaveText('No results found')

  await Search.toggleUseRegularExpression()

  await expect(message).toHaveText('2 results in 1 file')
}
