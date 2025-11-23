import { Page, expect } from '@playwright/test';

export class DashboardPage {
  constructor(private page: Page) {}

  async expectOnDashboard() {
    await expect(this.page).toHaveURL(/\/dashboard/);
    await expect(
      this.page.getByRole('heading', { name: /welcome back/i })
    ).toBeVisible();
  }

  startNewWorkoutButton() {
    return this.page.getByRole('button', { name: /start new workout/i });
  }

  async clickStartNewWorkout() {
    await this.startNewWorkoutButton().click();
  }
}
