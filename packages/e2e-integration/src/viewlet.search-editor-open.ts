import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'viewlet.search-editor-open'

const waitFor = async (assertion: () => Promise<void>): Promise<void> => {
  for (let attempt = 0; attempt < 100; attempt++) {
    try {
      await assertion()
      return
    } catch (error) {
      if (attempt === 99) {
        throw error
      }
      await new Promise((resolve) => setTimeout(resolve, 50))
    }
  }
}

export const test: Test = async ({ expect, FileSystem, KeyBoard, Locator, Main, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/search-editor.txt`, 'search editor')
  await Workspace.setUri(tmpDir)
  await Main.closeAllEditors()
  await Locator('.ActivityBarItem[title="Search"]').click()
  await new Promise((resolve) => setTimeout(resolve, 500))

  const searchEditorButton = Locator('button[title="Open New Search Editor"]')
  await expect(searchEditorButton).toBeVisible()
  await searchEditorButton.click()

  const tabs = Locator('.MainTab')
  await expect(tabs).toHaveCount(1)
  await expect(tabs.locator('.TabTitle')).toHaveText('Search')
  const searchInput = Locator('.Main textarea[name="SearchValue"]')
  await waitFor(() => expect(searchInput).toBeVisible())
  await waitFor(() => expect(searchInput).toBeFocused())
  for (const key of 'immediately focused') {
    await KeyBoard.press(key === ' ' ? 'Space' : key)
  }
  await expect(searchInput).toHaveValue('immediately focused')
}
