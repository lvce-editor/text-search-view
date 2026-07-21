import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.result-context-menu-match-copy'
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
  await Search.handleContextMenu(2, 300, 124)
  const menu = Locator('.Menu')
  const menuItems = menu.locator('.MenuItem')
  const copy = menuItems.nth(1)
  await expect(copy).toHaveText('Copy')
  await copy.click()

  // assert
  await ClipBoard.shouldHaveText('abc')
}
