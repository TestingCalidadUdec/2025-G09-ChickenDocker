// pages/admin/workout.template.page.ts
import { Page, expect, Locator } from '@playwright/test';

export class WorkoutTemplatePage {
  constructor(private page: Page) {}

  createTemplateButton(): Locator {
    return this.page.getByRole('button', { name: 'Create Template' });
  }
  
  modalTitle(): Locator {
    return this.page.getByRole('heading', { name: /create new template/i });
  }

  templateNameInput(): Locator {
    return this.page.getByLabel('Template Name *');
  }

  descriptionTextarea(): Locator {
    return this.page.getByLabel('Description');
  }

  addExerciseButtonInModal(): Locator {
    return this.page.getByRole('button', { name: /add exercise/i });
  }

  saveButton(): Locator {
    return this.page.getByRole('button', { name: 'Create Template' }).nth(1); // No pille otra forma :(
  }

  exerciseSelectorModalTitle(): Locator {
    return this.page.getByRole('heading', { name: 'Select Exercise' });
  }

  getExerciseRowByName(name: string): Locator {
    return this.page.getByRole('heading', { name: name });
  }

  async openCreateTemplateModal() {
    await this.createTemplateButton().click();
    await expect(this.modalTitle()).toBeVisible();
  }

  async fillTemplateDetails(name: string, description?: string, isPublic: boolean = false) {
    await this.templateNameInput().fill(name);
    if (description) {
      await this.descriptionTextarea().fill(description);
    }
    if (isPublic) {
      await this.page.getByRole('radio', { name: 'Public' }).click();
    } else {
      await this.page.getByRole('radio', { name: 'Private' }).click();
    }
  }

  async addExerciseToTemplate(exerciseName: string) {
    await this.addExerciseButtonInModal().click();
    await expect(this.exerciseSelectorModalTitle()).toBeVisible();

    await this.getExerciseRowByName(exerciseName).click();

    await expect(this.exerciseSelectorModalTitle()).toBeHidden(); 

    await expect(this.page.getByRole('heading', { name: exerciseName })).toBeVisible();
  }

  async createTemplateWithExercises(name: string, exercises: string[]) {
    await this.openCreateTemplateModal();
    await this.fillTemplateDetails(name);

    for (const exerciseName of exercises) {
      await this.addExerciseToTemplate(exerciseName);
    }

    await this.saveButton().click();
  }
}