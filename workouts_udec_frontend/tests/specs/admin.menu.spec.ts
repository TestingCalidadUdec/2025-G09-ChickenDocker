 /**
 * Funcionalidades cubiertas:
 *  - Login como administrador antes de cada test
 *  - Navegación al panel de administración y sus secciones
 *  - Creación de usuarios desde el panel de administración
 *  - Creación de ejercicios desde el panel de administración
 *  - Creación de plantillas de rutinas de entrenamiento
 */

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { AppLayout } from '../pages/app-layout.page'; 

import { AdminPage } from '../pages/admin.page'; 
import { UserManagementPage } from '../pages/admin.user.managment.page';
import { ExerciseManagementPage } from '../pages/admin.exercise.management.page';
import { WorkoutTemplatePage } from '../pages/admin.workout.template.page';

// Variables únicas para evitar colisiones entre ejecuciones
const UNIQUE = Date.now();
const TEST_EXERCISE_NAME = `Test Exercise ${UNIQUE}`;
const TEST_TEMPLATE_NAME = `Test Template ${UNIQUE}`;

// Agrupación de tests relacionados con el menú de administración
test.describe('Admin Menu', () => {
    let appLayout: AppLayout;
    let adminPage: AdminPage;
    let userManagementPage: UserManagementPage;
    let exerciseManagementPage: ExerciseManagementPage;
    let workoutTemplatePage: WorkoutTemplatePage;

    // Hook para iniciar sesión como administrador antes de cada test
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        appLayout = new AppLayout(page);
        adminPage = new AdminPage(page);
        userManagementPage = new UserManagementPage(page);
        exerciseManagementPage = new ExerciseManagementPage(page);
        workoutTemplatePage = new WorkoutTemplatePage(page);

        // 1. Login
        await loginPage.goto();
        await loginPage.login('admin@example.com', 'admin123');
        await loginPage.expectLoggedIn();
        });

    // Test verifica navegar al panel de administracion
    // Verifica que el usuario puede acceder al panel admin despues de iniciar sesion.
    test('Moverse al panel admin', async ({ page }) => {
        await adminPage.goto();
        await adminPage.expectOnAdminPage();
    });

    // Test verifica navegar a la seccion de gestion de usuarios
    // Verifica que el usuario puede acceder a la gestion de usuarios desde el panel admin.
    test('Moverse hacia user managment', async ({ page }) => {
        await adminPage.goto();
        await adminPage.goToUserManagement(); 
    });

     // Test verifica crear un nuevo usuario desde la gestión de usuarios
     // Crea un usuario con datos únicos y verifica que aparece en la lista.
    test('Crear usuario con user managment', async ({ page }) => {
        const uniqueUser = `new_user_${Date.now()}`;
        
        await adminPage.goto();
        await adminPage.goToUserManagement(); 
        
        await userManagementPage.createUser({
            username: uniqueUser,
            email: `${uniqueUser}@test.com`,
            password: 'newuserpass',
            fullName: 'New Test User Admin',
            isAdmin: false,
        });

        await expect(page.getByText(`@${uniqueUser}`, { exact: false })).toBeVisible();
    });

     // Test verifica navegar a la sección de gestión de ejercicios
     // Verifica que el usuario puede acceder a la gestión de ejercicios desde el panel admin.
    test('Moverse hacia exercise managment', async ({ page }) => {
        await adminPage.goto();
        await adminPage.goToExerciseManagement();
    });

     // Test verifica crear un nuevo ejercicio desde la gestión de ejercicios
     // Crea un ejercicio con nombre único y verifica que aparece en la lista.
    test('Crear ejercicio con exercise managment', async ({ page }) => {
        await adminPage.goto();
        await adminPage.goToExerciseManagement();

        await exerciseManagementPage.createExercise({
            name: TEST_EXERCISE_NAME,
            type: 'WEIGHT_BASED',
            muscleGroup: 'Chest',
            equipment: 'Barbell',
            description: 'test exercise',
        });

        await expect(page.getByText(TEST_EXERCISE_NAME)).toBeVisible();
    });

     // Test verifica navegar a la sección de plantillas de rutinas
     // Verifica que el usuario puede acceder a la gestión de plantillas desde el panel admin.
    test('Moverse hacia workout templates', async ({ page }) => {
        await adminPage.goto();
        await adminPage.goToWorkoutTemplates();
    });

     // Test verifica crear una plantilla de rutina con ejercicios
     // Crea una plantilla con el ejercicio previamente creado y verifica que aparece en la lista.
    test('Crear una rutina de trabajo con workout template', async ({ page }) => {
        await adminPage.goto();
        await adminPage.goToWorkoutTemplates();

        await workoutTemplatePage.createTemplateWithExercises(
            TEST_TEMPLATE_NAME, 
            [TEST_EXERCISE_NAME] 
        );

        await expect(page.getByText(TEST_TEMPLATE_NAME)).toBeVisible();
    });
});