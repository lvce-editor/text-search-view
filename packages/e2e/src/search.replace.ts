import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.replace'

export const test: Test = async ({ expect, FileSystem, Locator, Main, Search, SideBar, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, `abc`)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue('ab')
  const viewletSearch = Locator('.Search')
  const message = viewletSearch.locator('[role="status"]')
  await expect(message).toHaveText('1 result in 1 file')

  // act
  await Search.toggleReplace()
  await Search.setReplaceValue('d')
  await Search.replaceAll()

  // assert
  await Main.openUri(`${tmpDir}/test.css`)
  const row = Locator('.EditorRow')
  await expect(row).toHaveText('d') // TODO should be dc
  await expect(message).toHaveText(`Replaced 1 occurrence across 1 file with 'd'`)
}
