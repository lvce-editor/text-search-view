import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.replace-multiline-preview'

export const test: Test = async ({ expect, FileSystem, Locator, Search, SideBar, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, `abc`)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue('b')
  await Search.toggleReplace()
  await Search.setReplaceValue(`x
y`)

  // assert
  const viewletSearch = Locator('.Search')
  const message = viewletSearch.locator('[role="status"]')
  await expect(message).toHaveText('1 result in 1 file')
  const replacementPreview = viewletSearch.locator('ins')
  await expect(replacementPreview).toHaveText('x')
}
