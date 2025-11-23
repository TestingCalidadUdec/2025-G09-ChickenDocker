import { Page, expect } from '@playwright/test';

export class HistoryPage {
  constructor(private page: Page) {}

  async expectOnHistoryPage() {
    await expect(this.page).toHaveURL(/\/history/);
    await this.page.getByRole('heading', { name: /workout history/i });
  }

  searchInput() {
    return this.page.getByPlaceholder(/search workouts or exercises/i);
  }

  workoutCardByName(name: string) {
    return this.page.getByText(name, { exact: false });
  }

  async expectWorkoutInHistory(name: string) {
    await expect(this.workoutCardByName(name)).toBeVisible();
  }
}
