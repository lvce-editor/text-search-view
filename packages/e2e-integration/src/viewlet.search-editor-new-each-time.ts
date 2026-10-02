import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'viewlet.search-editor-new-each-time'

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

export const test: Test = async ({ expect, FileSystem, Locator, Main, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/search-editor.txt`, 'search editor')
  await Workspace.setUri(tmpDir)
  await Main.closeAllEditors()
  await Locator('.ActivityBarItem[title="Search"]').click()
  await new Promise((resolve) => setTimeout(resolve, 500))

  const searchEditorButton = Locator('button[title="Open New Search Editor"]')
  await expect(searchEditorButton).toBeVisible()
  await searchEditorButton.click()
  const searchInput = Locator('.Main textarea[name="SearchValue"]')
  await waitFor(() => expect(searchInput).toBeVisible())
  await waitFor(() => expect(searchInput).toBeFocused())
  await searchInput.type('first editor')
  await expect(searchInput).toHaveValue('first editor')
  const searchEditorButtonAfterFirstOpen = Locator('button[title="Open New Search Editor"]')
  await expect(searchEditorButtonAfterFirstOpen).toHaveCount(1)
  await searchEditorButtonAfterFirstOpen.click()
  await waitFor(() => expect(searchInput).toBeFocused())

  const tabs = Locator('.MainTab')
  await expect(tabs).toHaveCount(2)
  await expect(tabs.nth(0).locator('.TabTitle')).toHaveText('Search')
  await expect(tabs.nth(1).locator('.TabTitle')).toHaveText('Search')
  await expect(tabs.nth(0)).toHaveAttribute('aria-selected', 'false')
  await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true')
  await expect(searchInput).toBeFocused()
  await searchInput.type('newest editor')
  await expect(searchInput).toHaveValue('newest editor')
  await tabs.nth(0).click()
  await waitFor(() => expect(tabs.nth(0)).toHaveAttribute('aria-selected', 'true'))
  await expect(searchInput).toHaveValue('first editor')
  await tabs.nth(1).click()
  await waitFor(() => expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true'))
  await expect(searchInput).toHaveValue('newest editor')
}
