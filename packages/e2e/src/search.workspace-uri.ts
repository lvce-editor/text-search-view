import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.workspace-uri'

export const test: Test = async ({ Dialog, expect, FileSystem, Locator, Main, Search, SideBar, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  const workspacePath = `${tmpDir}/project files 100%`
  const filePath = `${workspacePath}/file #100%.txt`
  await FileSystem.mkdir(workspacePath)
  await FileSystem.writeFile(filePath, 'needle')
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Workspace.setPath(workspacePath)

  // act
  await Search.setValue('needle')

  // assert
  const message = Locator('.Search').locator('[role="status"]')
  await expect(message).toHaveText('1 result in 1 file')
  await Search.selectIndex(1)
  await expect(Locator('.EditorRow')).toHaveText('needle')

  // act
  await Search.toggleReplace()
  await Search.setReplaceValue('pin')
  await Dialog.mockConfirm(() => true)
  await Search.replaceAll()

  // assert
  await expect(message).toHaveText("Replaced 1 occurrence across 1 file with 'pin'")
  await Main.openUri(filePath)
  await expect(Locator('.EditorRow')).toHaveText('pin')
}
