import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.replace-all-one-result'

export const test: Test = async ({ Dialog, expect, FileSystem, Locator, Main, Search, SideBar, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, `abc`)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue('ab')
  await Search.toggleReplace()
  await Search.setReplaceValue('d')
  const viewletSearch = Locator('.Search')
  const message = viewletSearch.locator('[role="status"]')
  await expect(message).toHaveText('1 result in 1 file')
  let confirmMessage = ''
  await Dialog.mockConfirm((...args: readonly unknown[]) => {
    confirmMessage = String(args[0])
    return true
  })

  // act
  await Search.replaceAll()
  await Main.openUri(`${tmpDir}/test.css`)

  // assert
  const row = Locator('.EditorRow')
  await expect(row).toHaveText('dc')
  await expect(message).toHaveText(`Replaced 1 occurrence across 1 file with 'd'`)
  if (confirmMessage !== "Replace 1 occurrence across 1 file with 'd'") {
    throw new Error(`unexpected confirm message: ${confirmMessage}`)
  }
}
