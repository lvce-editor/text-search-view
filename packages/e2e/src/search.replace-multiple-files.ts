import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.replace-multiple-files'

export const skip = 1

export const test: Test = async ({ Dialog, expect, FileSystem, Locator, Main, Search, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/first.css`, `abc`)
  await FileSystem.writeFile(`${tmpDir}/second.css`, `zabz`)
  await Workspace.setPath(tmpDir)
  await Search.open()
  await Search.setValue('ab')
  await Search.toggleReplace()
  await Search.setReplaceValue('xy')
  const viewletSearch = Locator('.Search')
  const message = viewletSearch.locator('[role="status"]')
  await expect(message).toHaveText('2 results in 2 files')
  await Dialog.mockConfirm(() => true)

  // act
  await Search.replaceAll()

  // assert
  await Main.openUri(`${tmpDir}/first.css`)
  const firstRow = Locator('.EditorRow')
  await expect(firstRow).toHaveText('xyc')
  await Main.openUri(`${tmpDir}/second.css`)
  const secondRow = Locator('.EditorRow')
  await expect(secondRow).toHaveText('zxyz')
  await expect(message).toHaveText(`Replaced 2 occurrences across 2 files with 'xy'`)
}
