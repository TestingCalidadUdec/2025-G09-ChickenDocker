import { test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.describe('Login', () => {
  let loginPage: LoginPage;
    
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.expectOnLoginPage();
  });

  test('login exitoso con credenciales válidas', async ({ page }) => {
    await loginPage.login('admin@example.com', 'admin123');

    await loginPage.expectLoggedIn();
  });

  test('login falla email inexistente', async ({ page }) => {
    await loginPage.login('malo@ejemplo.com', 'admin123');

    await loginPage.expectLoginErrorVisible();
  });

  test('login falla contraseñña incorrecta', async ({ page }) => {
    await loginPage.login('admin@example.com', 'admin456');

    await loginPage.expectLoginErrorVisible();
  });
});
