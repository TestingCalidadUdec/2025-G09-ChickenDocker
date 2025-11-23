import { Page, expect } from '@playwright/test';

export class AppLayout {
  constructor(private page: Page) {}

  dashboardLink() {
    return this.page.getByRole('link', { name: 'Dashboard' });
  }

  profileLink() {
    return this.page.getByRole('link', { name: 'Profile' });
  }

  workoutsLink() {
    return this.page.getByRole('link', { name: 'Workouts' });
  }

  historyLink() {
    return this.page.getByRole('link', { name: 'History' });
  }

  logoutButton() {
    return this.page.getByRole('button', { name: /logout/i });
  }

  async goToDashboard() {
    await this.dashboardLink().click();
    await expect(this.page).toHaveURL(/\/dashboard/);
  }

  async goToProfile() {
    await this.profileLink().click();
    await expect(this.page).toHaveURL(/\/profile/);
  }

  async goToWorkouts() {
    await this.workoutsLink().click();
    await expect(this.page).toHaveURL(/\/workouts/);
  }

  async goToHistory() {
    await this.historyLink().click();
    await expect(this.page).toHaveURL(/\/history/);
  }

  async logout() {
    await this.logoutButton().click();
  }
}
