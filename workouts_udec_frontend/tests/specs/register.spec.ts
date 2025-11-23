import { test } from '@playwright/test';
import { RegisterPage } from '../pages/register.page';

test.describe('Register', () => {
  test('registro exitoso con datos válidos', async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await registerPage.goto();
    await registerPage.expectOnRegisterPage();

    const unique = Date.now();

    await registerPage.register({
      fullName: 'Test User',
      username: `user${unique}`,
      email: `user${unique}@test.com`,
      password: 'password123',
      confirmPassword: 'password123',
    });

    await registerPage.expectSuccessMessage();
  });
});
