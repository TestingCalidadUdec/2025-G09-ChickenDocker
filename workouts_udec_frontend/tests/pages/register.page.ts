import { Page, expect } from '@playwright/test';

export class RegisterPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/register');
  }

  private fullNameInput() {
    return this.page.getByLabel('Full Name');
  }

  private usernameInput() {
    return this.page.getByLabel('Username *');
  }

  private emailInput() {
    return this.page.getByLabel('Email *');
  }

  // 👇 aquí el cambio importante
  private passwordInput() {
    return this.page.locator('#password');
  }

  private confirmPasswordInput() {
    return this.page.locator('#confirmPassword');
  }

  private submitButton() {
    return this.page.getByRole('button', { name: /create account/i });
  }

  private errorMessage() {
    return this.page.getByText(/passwords do not match|already exists|failed|error/i);
  }

  private successMessage() {
    return this.page.getByText(/account created successfully/i);
  }

  async register(opts: {
    fullName: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) {
    const { fullName, username, email, password, confirmPassword } = opts;

    await this.fullNameInput().fill(fullName);
    await this.usernameInput().fill(username);
    await this.emailInput().fill(email);
    await this.passwordInput().fill(password);
    await this.confirmPasswordInput().fill(confirmPassword);
    await this.submitButton().click();
  }

  async expectOnRegisterPage() {
    await expect(this.page).toHaveURL(/\/register/);
  }

  async expectRegisterErrorVisible() {
    await expect(this.errorMessage()).toBeVisible();
  }

  async expectSuccessMessage() {
    await expect(this.successMessage()).toBeVisible();
  }
}
