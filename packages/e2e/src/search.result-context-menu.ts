import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.result-context-menu'

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
  await Search.focusIndex(0)
  await Search.handleContextMenu(-1, 0, 0)

  // assert
  const fileMenu = Locator('.Menu')
  await expect(fileMenu).toBeVisible()
  const fileMenuItems = Locator('.MenuItem')
  await expect(fileMenuItems).toHaveCount(6)
  await expect(fileMenuItems.nth(0)).toHaveText('Replace All')
  await expect(fileMenuItems.nth(1)).toHaveText('Dismiss')
  await expect(fileMenuItems.nth(2)).toHaveText('Copy')
  await expect(fileMenuItems.nth(3)).toHaveText('Copy Path')
  await expect(fileMenuItems.nth(4)).toHaveText('Copy All')
  await expect(fileMenuItems.nth(5)).toHaveText('Reveal in Explorer View')
  await expect(Locator('.MenuItemSeparator')).toHaveCount(2)

  await Search.focusIndex(1)
  await Search.handleContextMenu(-1, 0, 0)

  const matchMenu = Locator('.Menu')
  await expect(matchMenu).toBeVisible()
  const matchMenuItems = Locator('.MenuItem')
  await expect(matchMenuItems).toHaveCount(4)
  await expect(matchMenuItems.nth(0)).toHaveText('Dismiss')
  await expect(matchMenuItems.nth(1)).toHaveText('Copy')
  await expect(matchMenuItems.nth(2)).toHaveText('Copy All')
  await expect(matchMenuItems.nth(3)).toHaveText('Reveal in Explorer View')
  await expect(Locator('.MenuItemSeparator')).toHaveCount(2)
}
