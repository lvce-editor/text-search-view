import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.replace-all-cancel'

export const test: Test = async ({ Dialog, expect, FileSystem, Locator, Main, Search, SideBar, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/first.css`, `abc`)
  await FileSystem.writeFile(`${tmpDir}/second.css`, `zabz`)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue('ab')
  await Search.toggleReplace()
  await Search.setReplaceValue('xy')
  const viewletSearch = Locator('.Search')
  const message = viewletSearch.locator('[role="status"]')
  await expect(message).toHaveText('2 results in 2 files')
  let confirmMessage = ''
  await Dialog.mockConfirm((...args: readonly unknown[]) => {
    confirmMessage = String(args[0])
    return false
  })

  // act
  await Search.replaceAll()

  // assert
  if (confirmMessage !== "Replace 2 occurrences across 2 files with 'xy'") {
    throw new Error(`unexpected confirm message: ${confirmMessage}`)
  }
  await expect(message).toHaveText('2 results in 2 files')
  await Main.openUri(`${tmpDir}/first.css`)
  const firstRow = Locator('.EditorRow')
  await expect(firstRow).toHaveText('abc')
  await Main.openUri(`${tmpDir}/second.css`)
  const secondRow = Locator('.EditorRow')
  await expect(secondRow).toHaveText('zabz')
}
