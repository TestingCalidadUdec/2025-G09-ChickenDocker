// tests/e2e/workout-full-flow.spec.ts
import { test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { WorkoutPage } from '../pages/workout.page';
import { AppLayout } from '../pages/app-layout.page';
import { HistoryPage } from '../pages/history.page';

const TEST_EMAIL = 'anyelo@gmail.com';
const TEST_PASSWORD = 'cacaca';

test('usuario puede crear un workout, usarlo y completarlo', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboard = new DashboardPage(page);
  const workoutPage = new WorkoutPage(page);
  const layout = new AppLayout(page);
  const historyPage = new HistoryPage(page);

  // 1. Login
  await loginPage.goto();
  await loginPage.login(TEST_EMAIL, TEST_PASSWORD);

  // 2. Dashboard
  await dashboard.expectOnDashboard();

  // 3. "Start New Workout" desde el Dashboard (abre modal)
  await dashboard.clickStartNewWorkout();

  const workoutName = `E2E Workout ${Date.now()}`;

  // 4. Crear workout en blanco con nombre
  await workoutPage.createBlankWorkout(workoutName);

  // 5. Ver pantalla del workout
  await workoutPage.expectOnWorkoutPage();
  await workoutPage.expectWorkoutName(workoutName);
  await workoutPage.expectNoExercisesYet();

  // 6. Intentar añadir ejercicios (si hay en la librería, añade; si no, al menos abre/cierra modal)
  await workoutPage.addAnyExerciseIfAvailable();

  // 7. Completar workout -> esto limpia el estado para que puedas correr el test de nuevo
  await workoutPage.completeWorkout()

  // 8. Ir a History y verificar que el workout aparece
  await layout.goToHistory();
  await historyPage.expectOnHistoryPage();

  await historyPage.expectWorkoutInHistory(workoutName);
});
