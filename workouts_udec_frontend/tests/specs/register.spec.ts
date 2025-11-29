/**
 * Funcionalidades cubiertas
 * - Registro exitoso con datos válidos y únicos
 * - Registro fallido por email repetido
 * - Registro fallido por username repetido
 */

import { test } from '@playwright/test';
import { RegisterPage } from '../pages/register.page';

test.describe('Register', () => {
  let registerPage: RegisterPage;

  // Antes de cada test: inicializa el Page Object y navega a la página de registro
  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);

    await registerPage.goto();
    await registerPage.expectOnRegisterPage();
  });

  // Test verifica el registro exitoso con datos válidos
  // Usa datos únicos para evitar conflictos si se ejecuta varias veces.
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

  // Test verifica el registro erróneo por email repetido
  // Intenta registrar un usuario con un email que ya existe.
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

  // Test verifica el registro erróneo por username repetido
  // Intenta registrar un usuario con un username que ya existe.
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

