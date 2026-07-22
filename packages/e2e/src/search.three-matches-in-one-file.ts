import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.three-matches-in-one-file'

export const test: Test = async ({ expect, FileSystem, Locator, Search, SideBar, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.txt`, `needle one\nneedle two\nneedle three`)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')

  // act
  await Search.setValue('needle')

  // assert
  const message = Locator('.Search').locator('[role="status"]')
  await expect(message).toHaveText('3 results in 1 file')
}
