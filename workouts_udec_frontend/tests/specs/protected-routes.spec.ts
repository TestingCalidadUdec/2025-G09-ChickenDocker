import { test, expect } from '@playwright/test';

test.describe('Rutas protegidas', () => {
  test('redirige a login si no está autenticado', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/login/);

    await page.goto('/profile');
    await expect(page).toHaveURL(/\/login/);

    await page.goto('/workouts');
    await expect(page).toHaveURL(/\/login/);

    await page.goto('/history');
    await expect(page).toHaveURL(/\/login/);
  });
});

