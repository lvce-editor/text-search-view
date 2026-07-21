import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.result-context-menu-file-copy-path'
export const skip = 1

export const test: Test = async ({ ClipBoard, expect, FileSystem, Locator, Search, SideBar, Workspace }) => {
  // arrange
  await ClipBoard.enableMemoryClipBoard()
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, `abc`)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue('ab')

  // act
  await Search.handleContextMenu(2, 300, 100)
  const menu = Locator('.Menu')
  const menuItems = menu.locator('.MenuItem')
  const copyPath = menuItems.nth(3)
  await expect(copyPath).toHaveText('Copy Path')
  await copyPath.click()

  // assert
  await ClipBoard.shouldHaveText('test.css')
}
