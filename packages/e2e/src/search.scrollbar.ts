import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.scrollbar'

export const test: Test = async ({ expect, FileSystem, Locator, Search, SideBar, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  const promises: Promise<void>[] = []
  for (let i = 0; i < 100; i++) {
    promises.push(FileSystem.writeFile(`${tmpDir}/${i}.css`, `abc`))
  }
  await Promise.all(promises)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')

  // act
  await Search.setValue('ab')

  // assert
  const viewletSearch = Locator('.Search')
  const message = viewletSearch.locator('[role="status"]')
  await expect(message).toHaveText('100 results in 100 files')

  // act
  await Search.handleWheel(1, 44)

  // assert
  const treeItems = Locator('.TreeItems')
  await expect(treeItems).toHaveCSS('top', '0px')
}
