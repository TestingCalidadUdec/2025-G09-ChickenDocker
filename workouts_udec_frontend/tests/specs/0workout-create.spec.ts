import { test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { WorkoutPage } from '../pages/workout.page';

const TEST_EMAIL = 'anyelo@gmail.com';
const TEST_PASSWORD = 'cacaca';

test.describe('Workout-Create', () => {
  test('usuario puede crear un blank workout desde el dashboard', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const workoutPage = new WorkoutPage(page);
  
    await loginPage.goto();
    await loginPage.login(TEST_EMAIL, TEST_PASSWORD);
  
    await dashboardPage.expectOnDashboard();
  
    await dashboardPage.clickStartNewWorkout();
  
    await workoutPage.startNewWorkoutHeading();
  
    const workoutName = `E2E Workout ${Date.now()}`;
  
    await workoutPage.fillWorkoutName(workoutName);
    await workoutPage.confirmStartWorkout();
  
    await workoutPage.expectOnWorkoutPage();
    await workoutPage.expectWorkoutName(workoutName);
    await workoutPage.expectNoExercisesYet();
  
    await workoutPage.completeWorkout();
  });
});