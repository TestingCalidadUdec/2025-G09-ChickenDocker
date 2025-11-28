// pages/admin/user.management.page.ts
import { Page, expect, Locator } from '@playwright/test';

export class UserManagementPage {
  constructor(private page: Page) {}

  addUserButton(): Locator {
    return this.page.getByRole('button', { name: 'Add User' });
  }
  
  modalTitle(): Locator {
    return this.page.getByRole('heading', { name: /create new user/i });
  }

  usernameInput(): Locator {
    return this.page.getByLabel('Username *');
  }

  emailInput(): Locator {
    return this.page.getByLabel('Email *');
  }
  
  fullNameInput(): Locator {
    return this.page.getByLabel('Full Name');
  }
  
  passwordInput(): Locator {
    return this.page.getByLabel(/^Password/i);
  }

  adminCheckbox(): Locator {
    return this.page.getByRole('dialog', { name: /user/i }).getByLabel('Admin');
  }

  saveButton(): Locator {
    return this.page.getByRole('button', { name: 'Save' });
  }

  async openCreateUserModal() {
    await this.addUserButton().click();
    await expect(this.modalTitle()).toBeVisible();
  }

  async fillUserForm(data: {
    username: string;
    email: string;
    password: string;
    fullName?: string;
    isAdmin?: boolean;
  }) {
    await this.usernameInput().fill(data.username);
    await this.emailInput().fill(data.email);
    await this.passwordInput().fill(data.password);
    
    if (data.fullName) {
      await this.fullNameInput().fill(data.fullName);
    }
    
    if (data.isAdmin) {
      await this.adminCheckbox().check();
    }
  }

  async createUser(data: Parameters<UserManagementPage['fillUserForm']>[0]) {
    await this.openCreateUserModal();
    await this.fillUserForm(data);
    await this.saveButton().click();
    await expect(this.modalTitle()).toBeHidden();
  }
}