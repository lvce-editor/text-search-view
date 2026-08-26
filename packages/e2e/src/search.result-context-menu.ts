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
  await Search.handleContextMenu(2, 300, 100)

  // assert
  const fileMenu = Locator('.Menu')
  await expect(fileMenu).toBeVisible()
  const fileMenuEntries = Locator('.Menu > [role]')
  await expect(fileMenuEntries).toHaveCount(8)
  await expect(fileMenuEntries.nth(0)).toHaveText('Replace All')
  await expect(fileMenuEntries.nth(1)).toHaveText('Dismiss')
  await expect(fileMenuEntries.nth(2)).toHaveAttribute('role', 'separator')
  await expect(fileMenuEntries.nth(3)).toHaveText('Copy')
  await expect(fileMenuEntries.nth(4)).toHaveText('Copy Path')
  await expect(fileMenuEntries.nth(5)).toHaveText('Copy All')
  await expect(fileMenuEntries.nth(6)).toHaveAttribute('role', 'separator')
  await expect(fileMenuEntries.nth(7)).toHaveText('Reveal in Explorer View')

  await Search.handleContextMenu(2, 300, 124)

  const matchMenu = Locator('.Menu')
  await expect(matchMenu).toBeVisible()
  const matchMenuEntries = Locator('.Menu > [role]')
  await expect(matchMenuEntries).toHaveCount(6)
  await expect(matchMenuEntries.nth(0)).toHaveText('Dismiss')
  await expect(matchMenuEntries.nth(1)).toHaveAttribute('role', 'separator')
  await expect(matchMenuEntries.nth(2)).toHaveText('Copy')
  await expect(matchMenuEntries.nth(3)).toHaveText('Copy All')
  await expect(matchMenuEntries.nth(4)).toHaveAttribute('role', 'separator')
  await expect(matchMenuEntries.nth(5)).toHaveText('Reveal in Explorer View')
}
