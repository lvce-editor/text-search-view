import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.workspace-uri'

export const test: Test = async ({ Dialog, expect, FileSystem, Locator, Main, Search, SideBar, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  const workspaceUri = `${tmpDir}/project%20files%20100%25`
  const filePath = `${workspaceUri}/file.txt`
  await FileSystem.mkdir(workspaceUri)
  await FileSystem.writeFile(filePath, 'needle')
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Workspace.setPath(workspaceUri)

  // act
  await Search.setValue('needle')

  // assert
  const message = Locator('.Search').locator('[role="status"]')
  await expect(message).toHaveText('1 result in 1 file')
  await Search.selectIndex(1)
  const row = Locator('.EditorRow')
  await expect(row).toHaveText('needle')

  // act
  await Search.toggleReplace()
  await Search.setReplaceValue('pin')
  await Dialog.mockConfirm(() => true)
  await Search.replaceAll()

  // assert
  await expect(message).toHaveText("Replaced 1 occurrence across 1 file with 'pin'")
  await Main.openUri(filePath)
  await expect(row).toHaveText('pin')
}
