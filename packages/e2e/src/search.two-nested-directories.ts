import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.two-nested-directories'

export const test: Test = async ({ expect, FileSystem, Locator, Search, SideBar, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.mkdir(`${tmpDir}/one`)
  await FileSystem.mkdir(`${tmpDir}/two`)
  await FileSystem.setFiles([
    { content: `needle`, uri: `${tmpDir}/one/test.txt` },
    { content: `needle`, uri: `${tmpDir}/two/test.txt` },
  ])
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')

  // act
  await Search.setValue('needle')

  // assert
  const message = Locator('.Search').locator('[role="status"]')
  await expect(message).toHaveText('2 results in 2 files')
}
