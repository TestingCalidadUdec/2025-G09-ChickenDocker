/**
 * Funcionalidades cubiertas
 * - Inicia sesión con un usuario válido
 * - Navega al perfil
 * - Actualiza el username y el nombre completo con valores únicos
 * - Verifica que aparece un mensaje de éxito tras la actualización
 */

import { test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProfilePage } from '../pages/profile.page';
import { AppLayout } from '../pages/app-layout.page';

const TEST_EMAIL = 'anyelo@gmail.com';
const TEST_PASSWORD = 'cacaca';

test.describe('Update User', () => {
   // Test verifica actualizar username y full name en el perfil
   // Usa un username único para evitar conflictos si se ejecuta varias veces
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
});