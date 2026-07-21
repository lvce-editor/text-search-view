import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.clear-scrollbar-on-empty-input'

export const test: Test = async ({ expect, FileSystem, Locator, Search, SideBar, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  const promises: Promise<void>[] = []
  for (let i = 0; i < 100; i++) {
    promises.push(FileSystem.writeFile(`${tmpDir}/${i}.css`, 'abc'))
  }
  await Promise.all(promises)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue('ab')

  const scrollBar = Locator('[role="scrollbar"]')
  await expect(scrollBar).toHaveCount(1)

  // act
  await Search.setValue('')

  // assert
  await expect(scrollBar).toHaveCount(0)
}
