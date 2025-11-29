import { test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { AppLayout } from '../pages/app-layout.page';

const TEST_EMAIL = 'anyelo@gmail.com';
const TEST_PASSWORD = 'cacaca';
const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'admin123';

test.describe('Navigation', () => {
  let loginPage: LoginPage;
  let layout: AppLayout;
  
    test.beforeEach(async ({ page }) => {
      loginPage = new LoginPage(page);
      layout = new AppLayout(page);
      await loginPage.goto();
    });


  test('Uusario navega entre Dashboard, Profile, Workouts y History', async ({ page }) => {
    await loginPage.login(TEST_EMAIL, TEST_PASSWORD);
  
    await layout.goToProfile();
    await layout.goToWorkouts();
    await layout.goToHistory();
    await layout.goToDashboard();
  });
  
  test('Admin navega entre Dashboard, Profile, Workouts, History y Admin', async ({ page }) => {
    await loginPage.login(ADMIN_EMAIL, ADMIN_PASSWORD);
  
    await layout.goToProfile();
    await layout.goToWorkouts();
    await layout.goToHistory();
    await layout.goToDashboard();
    await layout.goToAdmin();
  });

});