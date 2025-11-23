import { test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProfilePage } from '../pages/profile.page';
import { AppLayout } from '../pages/app-layout.page';

const TEST_EMAIL = 'anyelo@gmail.com';
const TEST_PASSWORD = 'cacaca';

test('actualizar username y full name en el perfil', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const layout = new AppLayout(page);
  const profilePage = new ProfilePage(page);

  await loginPage.goto();
  await loginPage.login(TEST_EMAIL, TEST_PASSWORD);

  await layout.goToProfile();
  await profilePage.expectOnProfilePage();

  const unique = Date.now();

  await profilePage.updateProfile({
    username: `updated${unique}`,
    email: TEST_EMAIL,
    fullName: 'Pepe Actualizado',
  });

  await profilePage.expectSuccessMessage();
});
