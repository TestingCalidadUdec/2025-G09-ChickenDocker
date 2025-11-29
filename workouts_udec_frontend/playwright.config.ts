import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  workers: 1,

  use: {
    headless: false,
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry'
  },

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    timeout: 120000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }, 
    }
  ]

  
});
