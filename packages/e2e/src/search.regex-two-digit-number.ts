import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.regex-two-digit-number'

export const test: Test = async ({ expect, FileSystem, Locator, Search, SideBar, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.txt`, `7\n42\n100`)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue(String.raw`^\d{2}$`)
  const message = Locator('.Search').locator('[role="status"]')
  await expect(message).toHaveText('No results found')

  await Search.toggleUseRegularExpression()

  await expect(message).toHaveText('1 result in 1 file')
}
