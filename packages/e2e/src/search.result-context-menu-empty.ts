import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.result-context-menu-empty'
export const skip = 1

export const test: Test = async ({ expect, FileSystem, Locator, Search, SideBar, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, `abc`)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue('')

  // act
  await Search.handleContextMenu(2, 300, 100)

  // assert
  const menu = Locator('.Menu')
  await expect(menu).toHaveCount(0)
}
