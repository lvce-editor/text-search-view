import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.replace-all-two-results'

export const skip = 1

export const test: Test = async ({ Dialog, expect, FileSystem, Locator, Main, Search, SideBar, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/test.css`,
    `abc
abc`,
  )
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue('ab')
  await Search.toggleReplace()
  await Search.setReplaceValue('d')
  const viewletSearch = Locator('.Search')
  const message = viewletSearch.locator('[role="status"]')
  await expect(message).toHaveText('2 results in 1 file')
  await Dialog.mockConfirm(() => true)

  // act
  await Search.replaceAll()
  await Main.openUri(`${tmpDir}/test.css`)

  // assert
  const rows = Locator('.EditorRow')
  await expect(rows.nth(0)).toHaveText('d')
  await expect(rows.nth(1)).toHaveText('d')
  await expect(message).toHaveText(`Replaced 2 occurrences across 1 file with 'd'`)
}
