 /**
 * Funcionalidades cubiertas:
 * - Verifica que un usuario puede navegar entre Dashboard, Profile, Workouts y History.
 * - Verifica que un admin puede navegar entre Dashboard, Profile, Workouts, History y Admin.
 */

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

    // Antes de cada test: inicializa los Page Objects y navega a la página de login
    test.beforeEach(async ({ page }) => {
      loginPage = new LoginPage(page);
      layout = new AppLayout(page);
      await loginPage.goto();
    });

   // Test verifica usuario navega entre Dashboard, Profile, Workouts y History
   // Verifica que un usuario regular puede moverse entre las secciones principales.
  test('Uusario navega entre Dashboard, Profile, Workouts y History', async ({ page }) => {
    await loginPage.login(TEST_EMAIL, TEST_PASSWORD);
  
    await layout.goToProfile();
    await layout.goToWorkouts();
    await layout.goToHistory();
    await layout.goToDashboard();
  });

   // Test verifica Admin navega entre Dashboard, Profile, Workouts, History y Admin
   // Verifica que un usuario admin puede acceder también a la sección de administración.
   test('Admin navega entre Dashboard, Profile, Workouts, History y Admin', async ({ page }) => {
    await loginPage.login(ADMIN_EMAIL, ADMIN_PASSWORD);
  
    await layout.goToProfile();
    await layout.goToWorkouts();
    await layout.goToHistory();
    await layout.goToDashboard();
    await layout.goToAdmin();
   });

});