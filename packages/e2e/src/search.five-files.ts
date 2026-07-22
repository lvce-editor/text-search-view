import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.five-files'

export const test: Test = async ({ expect, FileSystem, Locator, Search, SideBar, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await Promise.all(Array.from({ length: 5 }, (_, index) => FileSystem.writeFile(`${tmpDir}/${index}.txt`, `needle`)))
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')

  // act
  await Search.setValue('needle')

  // assert
  const message = Locator('.Search').locator('[role="status"]')
  await expect(message).toHaveText('5 results in 5 files')
}
