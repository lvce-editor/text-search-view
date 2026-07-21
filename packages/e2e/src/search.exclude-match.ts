import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.exclude-match'

export const test: Test = async ({ expect, FileSystem, Locator, Search, SideBar, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/a.css`, `needle`)
  await FileSystem.writeFile(`${tmpDir}/b.js`, `needle`)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue('needle')
  const viewletSearch = Locator('.Search')
  const message = viewletSearch.locator('[role="status"]')
  await expect(message).toHaveText('2 results in 2 files')

  // act
  await Search.setExcludeValue('b.js')

  // assert
  await expect(message).toHaveText('1 result in 1 file')
}
