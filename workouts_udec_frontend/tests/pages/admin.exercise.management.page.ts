// pages/admin/exercise.management.page.ts
import { Page, expect, Locator } from '@playwright/test';

export class ExerciseManagementPage {
  constructor(private page: Page) {}

  addExerciseButton(): Locator {
    return this.page.getByRole('button', { name: 'Add Exercise' });
  }
  
  modalTitle(): Locator {
    return this.page.getByRole('heading', { name: /create new exercise/i });
  }

  nameInput(): Locator {
    return this.page.getByLabel('Exercise Name *');
  }
  
  typeSelect(): Locator {
    return this.page.getByLabel('Exercise Type *');
  }

  muscleGroupSelect(): Locator {
    return this.page.getByLabel('Muscle Group');
  }

  equipmentSelect(): Locator {
    return this.page.getByLabel('Equipment');
  }

  descriptionTextarea(): Locator {
    return this.page.getByLabel('Description');
  }

  saveButton(): Locator {
    return this.page.getByRole('button', { name: 'Save' });
  }
  
  async openCreateExerciseModal() {
    await this.addExerciseButton().click();
    await expect(this.modalTitle()).toBeVisible();
  }

  async fillExerciseForm(data: {
    name: string;
    type: 'WEIGHT_BASED' | 'TIME_BASED';
    muscleGroup: string;
    equipment: string;
    description?: string;
  }) {
    await this.nameInput().fill(data.name);
    await this.typeSelect().selectOption({ value: data.type });
    await this.muscleGroupSelect().selectOption({ label: data.muscleGroup });
    await this.equipmentSelect().selectOption({ label: data.equipment });
    
    if (data.description) {
      await this.descriptionTextarea().fill(data.description);
    }
  }

  async createExercise(data: Parameters<ExerciseManagementPage['fillExerciseForm']>[0]) {
    await this.openCreateExerciseModal();
    await this.fillExerciseForm(data);
    await this.saveButton().click();
    await expect(this.modalTitle()).toBeHidden();
  }
}