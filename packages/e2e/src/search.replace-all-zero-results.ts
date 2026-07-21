import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.replace-all-zero-results'

export const test: Test = async ({ expect, FileSystem, Locator, Main, Search, SideBar, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, `abc`)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue('xyz')
  await Search.toggleReplace()
  await Search.setReplaceValue('d')
  const viewletSearch = Locator('.Search')
  const message = viewletSearch.locator('[role="status"]')
  await expect(message).toHaveText('No results found')

  // act
  await Search.replaceAll()
  await Main.openUri(`${tmpDir}/test.css`)

  // assert
  const row = Locator('.EditorRow')
  await expect(row).toHaveText('abc')
  await expect(message).toHaveText(`Replaced 0 occurrences across 0 files with 'd'`)
}
