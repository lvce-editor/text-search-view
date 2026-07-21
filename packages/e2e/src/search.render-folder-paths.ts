import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.render-folder-paths'

const enableRenderFolderPaths = async (Command: { readonly execute: (id: string) => Promise<void> }): Promise<void> => {
  try {
    await Command.execute('Search.enableRenderFolderPaths')
  } catch {
    await Command.execute('TextSearch.enableRenderFolderPaths')
  }
}

const disableRenderFolderPaths = async (Command: { readonly execute: (id: string) => Promise<void> }): Promise<void> => {
  try {
    await Command.execute('Search.disableRenderFolderPaths')
  } catch {
    await Command.execute('TextSearch.disableRenderFolderPaths')
  }
}

export const skip = 1

export const test: Test = async ({ Command, expect, FileSystem, Locator, Search, SideBar, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.mkdir(`${tmpDir}/nested`)
  await FileSystem.writeFile(`${tmpDir}/nested/test.css`, `abc`)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue('ab')

  const result = Locator('.TreeItem[aria-label="/nested/test.css"]')
  const label = result.locator('.Label')
  await expect(label).toHaveText('test.css')

  // act
  await enableRenderFolderPaths(Command)

  // assert
  await expect(label).toHaveText('test.css — nested')

  await disableRenderFolderPaths(Command)
  await expect(label).toHaveText('test.css')
}
