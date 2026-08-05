import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.regex-email'

export const test: Test = async ({ expect, FileSystem, Locator, Search, SideBar, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.txt`, `user@example.com\nnot-an-email`)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue(String.raw`^[a-z]+@[a-z]+\.com$`)
  const message = Locator('.Search').locator('[role="status"]')
  await expect(message).toHaveText('No results found')

  await Search.toggleUseRegularExpression()

  await expect(message).toHaveText('1 result in 1 file')
}
