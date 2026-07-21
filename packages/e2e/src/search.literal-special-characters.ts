import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.literal-special-characters'

export const test: Test = async ({ expect, FileSystem, Locator, Search, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, `const value = 'a.c'`)
  await Workspace.setPath(tmpDir)
  await Search.open()

  // act
  await Search.setValue('a.c')
  await Search.setReplaceValue('')

  // assert
  const viewletSearch = Locator('.Search')
  const message = viewletSearch.locator('[role="status"]')
  await expect(message).toHaveText('1 result in 1 file')
}
