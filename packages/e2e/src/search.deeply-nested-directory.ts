import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.deeply-nested-directory'

export const test: Test = async ({ expect, FileSystem, Locator, Search, SideBar, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.mkdir(`${tmpDir}/one`)
  await FileSystem.mkdir(`${tmpDir}/one/two`)
  await FileSystem.mkdir(`${tmpDir}/one/two/three`)
  await FileSystem.writeFile(`${tmpDir}/one/two/three/test.txt`, `needle`)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')

  // act
  await Search.setValue('needle')

  // assert
  const message = Locator('.Search').locator('[role="status"]')
  await expect(message).toHaveText('1 result in 1 file')
}
