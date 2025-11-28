import { test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { AppLayout } from '../pages/app-layout.page';

const TEST_EMAIL = 'anyelo@gmail.com';
const TEST_PASSWORD = 'cacaca';

test.describe('Navigation', () => {
  test('navegación entre Dashboard, Profile, Workouts, History', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const layout = new AppLayout(page);
  
    await loginPage.goto();
    await loginPage.login(TEST_EMAIL, TEST_PASSWORD);
  
    await layout.goToProfile();
    await layout.goToWorkouts();
    await layout.goToHistory();
    await layout.goToDashboard();
  });
  
});