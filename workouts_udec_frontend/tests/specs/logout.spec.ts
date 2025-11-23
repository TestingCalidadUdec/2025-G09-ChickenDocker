import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { AppLayout } from '../pages/app-layout.page';

const TEST_EMAIL = 'anyelo@gmail.com';
const TEST_PASSWORD = 'cacaca';

test('logout cierra sesión y redirige a login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const appLayout = new AppLayout(page);

  await loginPage.goto();
  await loginPage.login(TEST_EMAIL, TEST_PASSWORD);

  await appLayout.logout();

  await expect(page).toHaveURL(/\/login/);

  // Intentar ir al dashboard otra vez debe mandar a login
  await page.goto('/dashboard');
  await expect(page).toHaveURL(/\/login/);
});
