import { test, expect } from '@playwright/test'

test('deve abrir a modal e carregar o vídeo com botões flutuantes', async ({ page }) => {
  await page.goto('/')

  const playButton = page.getByTestId('play-button')
  await playButton.click()

  const modal = page.getByTestId('video-modal')
  await expect(modal).toBeVisible()

  const iframe = page.getByTestId('video-frame')
  await expect(iframe).toBeVisible()

  await expect(page.getByTestId('screenshot-button')).toBeVisible()

  await expect(page.getByTestId('dpad-wrapper')).toBeVisible()

  await expect(page.getByTestId('btn-move-up')).toBeVisible()
  await expect(page.getByTestId('btn-move-down')).toBeVisible()
  await expect(page.getByTestId('btn-move-left')).toBeVisible()
  await expect(page.getByTestId('btn-move-right')).toBeVisible()
})
