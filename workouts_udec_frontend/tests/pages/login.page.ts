import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/login');
  }

  private emailInput() {
    return this.page.getByLabel('Email');
  }

  private passwordInput() {
    return this.page.getByLabel('Password');
  }

  private submitButton() {
    return this.page.getByRole('button', { name: /Sign in/i });
  }

  private errorMessage() {
    return this.page.getByText(/incorrect email or password/i);
  }

  async login(email: string, password: string) {
    await this.emailInput().fill(email);
    await this.passwordInput().fill(password);
    await this.submitButton().click();
  }

  async expectOnLoginPage() {
    await expect(this.page).toHaveURL(/\/login/);
  }

  async expectLoginErrorVisible() {
    await expect(this.errorMessage()).toBeVisible();
  }

  async expectLoggedIn() {
    await expect(this.page).toHaveURL(/\/dashboard/);
  }
}
