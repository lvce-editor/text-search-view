import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.handle-list-blur'

export const test: Test = async ({ expect, FileSystem, Locator, Search, SideBar, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, `abc`)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue('')
  await Search.selectIndex(-1)

  // act
  await Search.handleListBlur()

  // assert
  const tree = Locator('.Tree')
  await expect(tree).toHaveClass('Tree')
}
