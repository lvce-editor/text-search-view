import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.input-context-menu'

export const skip = 1

export const test: Test = async ({ expect, FileSystem, Locator, Search, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, `abc`)
  await Workspace.setPath(tmpDir)
  await Search.open()
  await Search.setValue('ab')
  await Search.setReplaceValue('')

  // act
  await Search.handleInputContextMenu('SearchValue', 0, 0, 0)

  // assert
  const menu = Locator('.Menu')
  await expect(menu).toBeVisible()
  const menuItems = menu.locator('.MenuItem')
  await expect(menuItems).toHaveCount(4)
  const first = menuItems.nth(0)
  await expect(first).toHaveText('Cut')
  const second = menuItems.nth(1)
  await expect(second).toHaveText('Copy')
  const third = menuItems.nth(2)
  await expect(third).toHaveText('Paste')
  const fourth = menuItems.nth(3)
  await expect(fourth).toHaveText('SelectAll')
}
