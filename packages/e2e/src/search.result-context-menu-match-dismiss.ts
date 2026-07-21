import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.result-context-menu-match-dismiss'
export const skip = 1

export const test: Test = async ({ expect, FileSystem, Locator, Search, SideBar, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, `abc\nabx`)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue('ab')

  // act
  await Search.handleContextMenu(2, 300, 124)
  const menu = Locator('.Menu')
  const menuItems = menu.locator('.MenuItem')
  const dismiss = menuItems.nth(0)
  await expect(dismiss).toHaveText('Dismiss')
  await dismiss.click()

  // assert
  const viewletSearch = Locator('.Search')
  const message = viewletSearch.locator('[role="status"]')
  await expect(message).toHaveText('1 result in 1 file')
  await expect(Locator('.TreeItem[aria-label="abc"]')).toBeHidden()
  await expect(Locator('.TreeItem[aria-label="abx"]')).toBeVisible()
}
