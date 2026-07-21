import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.result-collapse'

export const test: Test = async ({ expect, FileSystem, Locator, Search, SideBar, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, `abc`)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue('ab')
  await Search.setReplaceValue('')
  const viewletSearch = Locator('.Search')
  const message = viewletSearch.locator('[role="status"]')
  await expect(message).toHaveText('1 result in 1 file')
  const result = Locator('.TreeItem[aria-label="/test.css"]')
  await expect(result).toHaveAttribute('aria-expanded', 'true')
  const badge = result.locator('.Badge')
  await expect(badge).toHaveText('1')
  const match = Locator('.TreeItem[aria-label="abc"]')
  await expect(match).toBeVisible()

  // act
  await Search.selectIndex(0)

  // assert
  await expect(result).toHaveAttribute('aria-expanded', 'false')
  await expect(match).toBeHidden()
  await expect(badge).toHaveText('1')
}
