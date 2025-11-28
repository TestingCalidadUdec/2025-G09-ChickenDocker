import { test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.describe('Login', () => {

  test('login exitoso con credenciales válidas', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.expectOnLoginPage();

    await loginPage.login('admin@example.com', 'admin123');

    await loginPage.expectLoggedIn();
  });

  test('login falla email inexistente', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.expectOnLoginPage();

    await loginPage.login('malo@ejemplo.com', 'admin123');

    await loginPage.expectLoginErrorVisible();
  });

  test('login falla contraseñña incorrecta', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.expectOnLoginPage();

    await loginPage.login('admin@example.com', 'admin456');

    await loginPage.expectLoginErrorVisible();
  });
});
