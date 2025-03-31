import { test, expect } from '@playwright/test'

test('deve carregar a página inicial e exibir o texto do título na tela', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('Bem-vindo ao Stream-Video')).toBeVisible()
})
