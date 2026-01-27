import { expect } from "@playwright/test";
import { test as base } from "@playwright/test";
import { SetupWizardPage } from "../pages/setup-wizard.page";

type SetupFixture = {
  setupPage: SetupWizardPage;
};

export const test = base.extend<SetupFixture>({
  setupPage: async ({ page }, use) => {
    // Navigate to setup database page
    await page.goto("/");

    // Verify user is on Setup database page
    await expect(page.getByRole("button", { name: "Next" })).toBeVisible({
      timeout: 5000,
    });

    await use(new SetupWizardPage(page));
  },
});
