 /**
 * Funcionalidades cubiertas:
 * - Login exitoso con credenciales válidas
 * - Login fallido por email inexistente
 * - Login fallido por contraseña incorrecta
 */

import { test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.describe('Login', () => {
  let loginPage: LoginPage;

  // Antes de cada test: inicializa el Page Object y navega a la página de login
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.expectOnLoginPage();
  });

   // Test verifica el login exitoso
   // Verifica que el usuario puede iniciar sesión con credenciales válidas.
  test('login exitoso con credenciales válidas', async ({ page }) => {
    await loginPage.login('admin@example.com', 'admin123');

    await loginPage.expectLoggedIn();
  });

   // Test verifica login falla por email inexistente
   // Intenta iniciar sesión con un email que no existe y espera ver un mensaje de error.
  test('login falla email inexistente', async ({ page }) => {
    await loginPage.login('malo@ejemplo.com', 'admin123');

    await loginPage.expectLoginErrorVisible();
  });

   // Test verifica login falla por contraseña incorrecta
   // Intenta iniciar sesión con una contraseña incorrecta y espera ver un mensaje de error.
  test('login falla contraseñña incorrecta', async ({ page }) => {
    await loginPage.login('admin@example.com', 'admin456');

    await loginPage.expectLoginErrorVisible();
  });
});
