import { Page, expect } from '@playwright/test';

export class WorkoutPage {
  constructor(private page: Page) {}

  // ---------- MODAL "Start New Workout" ----------

  async startNewWorkoutHeading() {
    await expect(
      this.page.getByRole('heading', { name: /start new workout/i })
    ).toBeVisible();
  }

  private workoutNameInput() {
    return this.page.getByPlaceholder(/push day, morning run/i);
  }

  async fillWorkoutName(name: string) {
    await this.workoutNameInput().fill(name);
  }

  async confirmStartWorkout() {
    await this.page
      .getByRole('button', { name: /^start workout$/i })
      .click();
  }

  async createBlankWorkout(name: string) {
    await this.startNewWorkoutHeading();
    if (name) {
      await this.fillWorkoutName(name);
    }
    await this.confirmStartWorkout();
  }

  // ---------- PÁGINA DEL WORKOUT ACTIVO ----------

  async expectOnWorkoutPage() {
    await expect(this.page).toHaveURL(/\/workout/);
  }

  async expectWorkoutName(name: string) {
    await expect(
      this.page.getByText(name, { exact: false })
    ).toBeVisible();
  }

  async expectNoExercisesYet() {
    await expect(
      this.page.getByText(/no exercises yet/i)
    ).toBeVisible();
  }

  completeButton() {
    return this.page.getByRole('button', { name: /^complete$/i });
  }
  confirmCompleteButton() {
  return this.page.getByRole('button', { name: /complete workout/i });
}
completeModalTitle() {
  return this.page.getByRole('heading', { name: /complete workout/i });
}

async completeWorkout() {
  // 1. Click en "Complete" (abre modal)
  await this.completeButton().click();

  // 2. Esperar modal
  await this.completeModalTitle();

  // 3. Confirmar "Complete Workout"
  await this.confirmCompleteButton().click();
}

  // ---------- MODAL "Add Exercise to Workout" ----------

  addExerciseButton() {
    return this.page.getByRole('button', { name: /\+ add exercise/i });
  }

  addFirstExerciseButton() {
    return this.page.getByRole('button', { name: /add first exercise/i });
  }

  addExerciseModalTitle() {
    return this.page.getByRole('heading', { name: /add exercise to workout/i });
  }

  searchExercisesInput() {
    return this.page.getByPlaceholder(/search by name, muscle group/i);
  }

  doneButtonInExerciseModal() {
    return this.page.getByRole('button', { name: /^Done$/i });
  }

  async openAddExerciseModal() {
    const addFirstExists = await this.addFirstExerciseButton().count();
    if (addFirstExists > 0) {
      await this.addFirstExerciseButton().click();
    } else {
      await this.addExerciseButton().click();
    }
    await this.addExerciseModalTitle();
  }

  async addAnyExerciseIfAvailable() {
    await this.openAddExerciseModal();
    await this.page.getByText(/Add Exercise to Workout/i).waitFor();
    const addButtons = this.page.getByRole('button', { name: /^Add$/i })
    if (await addButtons.count()) {
      await addButtons.first().click();
    } else {
      await expect(
        this.page.getByText(/No exercises found/i)
      ).toBeVisible();
    }

    await this.doneButtonInExerciseModal().click();
  }

  async expectAtLeastOneExerciseInWorkout() {
    const exerciseRow = this.page.getByText(/sets|reps/i).first();
    await expect(exerciseRow).toBeVisible();
  }
}
