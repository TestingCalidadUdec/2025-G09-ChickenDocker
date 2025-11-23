import { test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.describe('Login', () => {
  test('login exitoso con credenciales válidas', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.expectOnLoginPage();

    await loginPage.login('anyelo@gmail.com', 'cacaca');

    await loginPage.expectLoggedIn();
  });

  test('login falla con credenciales inválidas', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.expectOnLoginPage();

    await loginPage.login('malo@ejemplo.com', 'incorrecta');

    await loginPage.expectLoginErrorVisible();
  });
});
