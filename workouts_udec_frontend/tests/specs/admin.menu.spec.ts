import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { AppLayout } from '../pages/app-layout.page'; // Necesario para la navegación inicial si el admin no redirige automáticamente

// Page Objects específicos de Admin UI
import { AdminPage } from '../pages/admin.page'; 
import { UserManagementPage } from '../pages/admin.user.managment.page';
import { ExerciseManagementPage } from '../pages/admin.exercise.management.page';
import { WorkoutTemplatePage } from '../pages/admin.workout.template.page';


// Datos de prueba para crear entidades únicas
const UNIQUE = Date.now();
const TEST_EXERCISE_NAME = `Test Exercise ${UNIQUE}`;
const TEST_TEMPLATE_NAME = `Test Template ${UNIQUE}`;

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

    test('Moverse al panel admin', async ({ page }) => {
        await adminPage.goto();
        await adminPage.expectOnAdminPage();
    });

    test('Moverse hacia user managment', async ({ page }) => {
        await adminPage.goto();
        await adminPage.goToUserManagement(); 
    });

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

    test('Moverse hacia exercise managment', async ({ page }) => {
        await adminPage.goto();
        await adminPage.goToExerciseManagement();
    });

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


    test('Moverse hacia workout templates', async ({ page }) => {
        await adminPage.goto();
        await adminPage.goToWorkoutTemplates();
    });

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