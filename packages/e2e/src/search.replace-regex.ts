import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.replace-regex'

export const test: Test = async ({ expect, FileSystem, Locator, Main, Search, SideBar, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, `abc`)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue('a.c')
  await Search.toggleReplace()
  await Search.setReplaceValue('adc')
  await Search.toggleUseRegularExpression()
  const viewletSearch = Locator('.Search')
  const message = viewletSearch.locator('[role="status"]')
  await expect(message).toHaveText('1 result in 1 file')

  // act
  await Search.replaceAll()
  await Main.openUri(`${tmpDir}/test.css`)

  // assert
  const row = Locator('.EditorRow')
  await expect(row).toHaveText('adc')
  await expect(message).toHaveText(`Replaced 1 occurrence across 1 file with 'adc'`)
}
