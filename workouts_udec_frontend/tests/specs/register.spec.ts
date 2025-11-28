import { test } from '@playwright/test';
import { RegisterPage } from '../pages/register.page';

test.describe('Register', () => {
  let registerPage: RegisterPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);

    await registerPage.goto();
    await registerPage.expectOnRegisterPage();
  });

  test('registro exitoso con datos válidos', async ({ page }) => {
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

  test('registro erroneo email repetido', async ({ page }) => {
    const unique = Date.now();
  
    await registerPage.register({
        fullName: 'Test User',
        username: `user${unique}`,
        email: `admin@test.com`,
        password: 'admin123',
        confirmPassword: 'password123',
      });
  
    await registerPage.expectRegisterErrorVisible();
  });
  
  test('registro erroneo username repetido', async ({ page }) => {
    const unique = Date.now();
  
    await registerPage.register({
        fullName: 'Test User',
        username: `admin`,
        email: `user${unique}@test.com`,
        password: 'admin123',
        confirmPassword: 'password123',
      });
  
    await registerPage.expectRegisterErrorVisible();
  });
});

