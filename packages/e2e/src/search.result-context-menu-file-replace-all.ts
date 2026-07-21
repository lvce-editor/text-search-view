import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.result-context-menu-file-replace-all'
export const skip = 1

export const test: Test = async ({ expect, FileSystem, Locator, Main, Search, SideBar, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/a.css`, `abc`)
  await FileSystem.writeFile(`${tmpDir}/b.css`, `abc`)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue('ab')
  await Search.toggleReplace()
  await Search.setReplaceValue('d')

  // act
  await Search.handleContextMenu(2, 300, 100)
  const menu = Locator('.Menu')
  const menuItems = menu.locator('.MenuItem')
  const replaceAll = menuItems.nth(0)
  await expect(replaceAll).toHaveText('Replace All')
  await replaceAll.click()

  // assert
  await Main.openUri(`${tmpDir}/a.css`)
  const row = Locator('.EditorRow')
  await expect(row).toHaveText('d')
  await Main.openUri(`${tmpDir}/b.css`)
  await expect(row).toHaveText('abc')
  const viewletSearch = Locator('.Search')
  const message = viewletSearch.locator('[role="status"]')
  await expect(message).toHaveText(`Replaced 1 occurrence across 1 file with 'd'`)
}
