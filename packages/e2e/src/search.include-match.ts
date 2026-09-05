import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.include-match'

export const test: Test = async ({ expect, FileSystem, Locator, Search, SideBar, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.setFiles([
    { content: `needle`, uri: `${tmpDir}/a.css` },
    { content: `needle`, uri: `${tmpDir}/b.js` },
  ])
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue('needle')
  const viewletSearch = Locator('.Search')
  const message = viewletSearch.locator('[role="status"]')
  await expect(message).toHaveText('2 results in 2 files')

  // act
  await Search.setIncludeValue('a.css')

  // assert
  await expect(message).toHaveText('1 result in 1 file')
}
