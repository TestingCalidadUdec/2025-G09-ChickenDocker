import { Page, Locator, expect } from '@playwright/test';
export class AdminPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/admin');
  }

  async expectOnAdminPage() {
    await expect(this.page).toHaveURL(/admin/);
  }

  userManagementTab(): Locator {
    return this.page.getByRole('button', { name: 'User Management' });
  }

  exerciseManagementTab(): Locator {
    return this.page.getByRole('button', { name: 'Exercise Management' });
  }

  workoutTemplatesTab(): Locator {
    return this.page.getByRole('button', { name: 'Workout Templates' });
  }

  async goToUserManagement() {
    await this.userManagementTab().click();
    await expect(this.page.getByRole('heading', { name: /user management/i })).toBeVisible();
  }
  
  async goToExerciseManagement() {
    await this.exerciseManagementTab().click();
    await expect(this.page.getByRole('heading', { name: /exercise management/i })).toBeVisible();
  }

  async goToWorkoutTemplates() {
    await this.workoutTemplatesTab().click();
    await expect(this.page.getByRole('heading', { name: /workout templates/i })).toBeVisible();
  }
}