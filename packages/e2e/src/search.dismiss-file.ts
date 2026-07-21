import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.dismiss-file'

export const test: Test = async ({ expect, FileSystem, Locator, Search, SideBar, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/a.css`, `abc`)
  await FileSystem.writeFile(`${tmpDir}/b.css`, `abc`)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue('ab')
  await Search.focusIndex(0)

  // act
  await Search.dismissItem()

  // assert
  const viewletSearch = Locator('.Search')
  const treeItems = viewletSearch.locator('.TreeItem')
  await expect(treeItems).toHaveCount(2)
}
