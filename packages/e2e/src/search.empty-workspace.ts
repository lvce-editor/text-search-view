import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.empty-workspace'

export const test: Test = async ({ expect, FileSystem, Locator, Main, Search, SideBar, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.setFiles([
    { content: '# Auth Worker', uri: `${tmpDir}/README.md` },
    { content: 'auth service', uri: `${tmpDir}/src/service.ts` },
    { content: 'auth should not be found', uri: `${tmpDir}/unopened.txt` },
  ])
  await Workspace.setPath('')
  await Main.openUri(`${tmpDir}/README.md`)
  await Main.openUri(`${tmpDir}/src/service.ts`)
  await SideBar.open('Search')

  // act
  await Search.setValue('auth')

  // assert
  const message = Locator('.SearchWorkspaceMessage')
  await expect(message).toBeVisible()
  await expect(message).toHaveText('You have not opened or specified a folder. Only open files are currently searched - Open Folder')
  await expect(message).toHaveCSS('line-height', '16px')
  await expect(message).toHaveCSS('margin-top', '-16px')
  await expect(message).toHaveCSS('overflow-wrap', 'break-word')
  await expect(message).toHaveCSS('padding-right', '22px')
  const searchResults = Locator('.Search').locator('[role="treeitem"]')
  const searchStatus = Locator('.Search').locator('[role="status"]')
  await expect(searchStatus).toHaveText('2 results in 2 files')
  await expect(searchResults).toHaveCount(4)
  await Search.selectIndex(1)
  const editorRow = Locator('.EditorRow')
  await expect(editorRow).toHaveText('# Auth Worker')
  const openFolderLink = message.locator('.MessageAction')
  await expect(openFolderLink).toHaveText('Open Folder')
  await expect(openFolderLink).toHaveCSS('line-height', '16px')
  await expect(openFolderLink).toHaveCSS('appearance', 'none')
  await expect(openFolderLink).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
  await expect(openFolderLink).toHaveCSS('border-top-width', '0px')
  await expect(openFolderLink).toHaveCSS('color', 'rgb(55, 148, 255)')
  await expect(openFolderLink).toHaveCSS('padding', '0px')
}
