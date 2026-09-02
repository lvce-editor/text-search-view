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
  const replaceAll = fileMenuItems.nth(0)
  const dismissFile = fileMenuItems.nth(1)
  const copyFile = fileMenuItems.nth(2)
  const copyPath = fileMenuItems.nth(3)
  const copyAllFileMatches = fileMenuItems.nth(4)
  const revealFile = fileMenuItems.nth(5)
  const separators = Locator('.MenuItemSeparator')
  await expect(fileMenuItems).toHaveCount(6)
  await expect(replaceAll).toHaveText('Replace All')
  await expect(dismissFile).toHaveText('Dismiss')
  await expect(copyFile).toHaveText('Copy')
  await expect(copyPath).toHaveText('Copy Path')
  await expect(copyAllFileMatches).toHaveText('Copy All')
  await expect(revealFile).toHaveText('Reveal in Explorer View')
  await expect(separators).toHaveCount(2)

  await Search.focusIndex(1)
  await Search.handleContextMenu(-1, 0, 0)

  const matchMenu = Locator('.Menu')
  await expect(matchMenu).toBeVisible()
  const matchMenuItems = Locator('.MenuItem')
  const dismissMatch = matchMenuItems.nth(0)
  const copyMatch = matchMenuItems.nth(1)
  const copyAllMatches = matchMenuItems.nth(2)
  const revealMatch = matchMenuItems.nth(3)
  await expect(matchMenuItems).toHaveCount(4)
  await expect(dismissMatch).toHaveText('Dismiss')
  await expect(copyMatch).toHaveText('Copy')
  await expect(copyAllMatches).toHaveText('Copy All')
  await expect(revealMatch).toHaveText('Reveal in Explorer View')
  await expect(separators).toHaveCount(2)
}
