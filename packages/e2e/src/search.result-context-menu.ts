import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.result-context-menu'
export const skip = 1

export const test: Test = async ({ expect, FileSystem, Locator, Search, SideBar, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, `abc\nabx`)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue('ab')
  await Search.toggleReplace()
  await Search.setReplaceValue('d')

  // act
  await Search.handleContextMenu(2, 300, 100)

  // assert
  const fileMenu = Locator('.Menu')
  await expect(fileMenu).toBeVisible()
  const fileMenuItems = fileMenu.locator('.MenuItem')
  await expect(fileMenuItems).toHaveCount(5)
  await expect(fileMenuItems.nth(0)).toHaveText('Replace All')
  await expect(fileMenuItems.nth(1)).toHaveText('Dismiss')
  await expect(fileMenuItems.nth(2)).toHaveText('Copy')
  await expect(fileMenuItems.nth(3)).toHaveText('Copy Path')
  await expect(fileMenuItems.nth(4)).toHaveText('Copy All')

  await Search.handleContextMenu(2, 300, 124)

  const matchMenu = Locator('.Menu')
  await expect(matchMenu).toBeVisible()
  const matchMenuItems = matchMenu.locator('.MenuItem')
  await expect(matchMenuItems).toHaveCount(3)
  await expect(matchMenuItems.nth(0)).toHaveText('Dismiss')
  await expect(matchMenuItems.nth(1)).toHaveText('Copy')
  await expect(matchMenuItems.nth(2)).toHaveText('Copy All')
}
