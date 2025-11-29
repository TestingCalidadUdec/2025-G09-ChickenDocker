/**
 * Funcionalidades cubiertas
 * - Intenta acceder a varias rutas protegidas sin estar autenticado
 * - Verifica que en todos los casos redirige a la pantalla de login
 */

import { test, expect } from '@playwright/test';

test.describe('Rutas protegidas', () => {
  // Test verifica que se redirige a login si no está autenticado
  // Intenta acceder a dashboard, profile, workouts e history sin sesión
  // Debe redirigir a /login en todos los casos
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

