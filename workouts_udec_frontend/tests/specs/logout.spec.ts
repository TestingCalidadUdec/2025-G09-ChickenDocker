 /**
 * Funcionalidades cubiertas:
 * - Inicia sesión con un usuario válido
 * - Hace logout desde el layout principal
 * - Verifica que se redirige a la pantalla de login
 * - Intenta acceder al dashboard y comprueba que vuelve a redirigir a login
 */

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { AppLayout } from '../pages/app-layout.page';

const TEST_EMAIL = 'anyelo@gmail.com';
const TEST_PASSWORD = 'cacaca';

// Test verifica logout cierra sesión y redirige a login
test.describe('Logout', () => {
  test('logout cierra sesión y redirige a login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const appLayout = new AppLayout(page);

    // Inicia sesión
    await loginPage.goto();
    await loginPage.login(TEST_EMAIL, TEST_PASSWORD);

    // Hace logout
    await appLayout.logout();

    // Debe redirigir a /login después de logout
    await expect(page).toHaveURL(/\/login/);
  
    // Si intenta ir al dashboard, debe seguir redirigiendo a login
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/login/);
  });
});