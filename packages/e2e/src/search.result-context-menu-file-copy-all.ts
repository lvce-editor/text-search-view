import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.result-context-menu-file-copy-all'
export const skip = 1

export const test: Test = async ({ ClipBoard, expect, FileSystem, Locator, Search, SideBar, Workspace }) => {
  // arrange
  await ClipBoard.enableMemoryClipBoard()
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, `abc\nabx`)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue('ab')

  // act
  await Search.handleContextMenu(2, 300, 100)
  const menu = Locator('.Menu')
  const menuItems = menu.locator('.MenuItem')
  const copyAll = menuItems.nth(4)
  await expect(copyAll).toHaveText('Copy All')
  await copyAll.click()

  // assert
  await ClipBoard.shouldHaveText('abc\nabx')
}
