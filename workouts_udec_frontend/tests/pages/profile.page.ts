import { Page, expect } from '@playwright/test';

export class ProfilePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/profile');
  }

  usernameInput() {
    return this.page.getByLabel('Username');
  }

  emailInput() {
    return this.page.getByLabel('Email');
  }

  fullNameInput() {
    return this.page.getByLabel('Full Name');
  }

  updateProfileButton() {
    return this.page.getByRole('button', { name: /update profile/i });
  }

  // Sección cambiar contraseña
  currentPasswordInput() {
    return this.page.getByLabel('Current Password');
  }

  newPasswordInput() {
    return this.page.getByLabel('New Password');
  }

  confirmNewPasswordInput() {
    return this.page.getByLabel('Confirm New Password');
  }

  successMessage() {
    return this.page.getByText(/profile updated successfully|profile updated/i);
  }

  async updateProfile(data: { username: string; email: string; fullName: string }) {
    await this.usernameInput().fill(data.username);
    await this.emailInput().fill(data.email);
    await this.fullNameInput().fill(data.fullName);
    await this.updateProfileButton().click();
  }

  async changePassword(data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) {
    await this.currentPasswordInput().fill(data.currentPassword);
    await this.newPasswordInput().fill(data.newPassword);
    await this.confirmNewPasswordInput().fill(data.confirmPassword);
    await this.updateProfileButton().click();
  }

  async expectOnProfilePage() {
    await expect(this.page).toHaveURL(/\/profile/);
  }

  async expectSuccessMessage() {
    await expect(this.successMessage()).toBeVisible();
  }
}
