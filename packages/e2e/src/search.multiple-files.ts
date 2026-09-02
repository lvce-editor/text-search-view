import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.multiple-files'

export const test: Test = async ({ expect, FileSystem, Locator, Search, SideBar, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.setFiles([
    { content: `needle`, uri: `${tmpDir}/a.txt` },
    { content: `needle`, uri: `${tmpDir}/b.txt` },
  ])
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')

  // act
  await Search.setValue('needle')

  // assert
  const viewletSearch = Locator('.Search')
  const message = viewletSearch.locator('[role="status"]')
  await expect(message).toHaveText('2 results in 2 files')
}
