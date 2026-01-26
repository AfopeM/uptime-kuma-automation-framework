import { ENV } from "../support/config";
import { test, expect } from "@playwright/test";
import { SetupWizardPage } from "../pages/setup-wizard.page";

test("completes initial setup wizard", async ({ page }) => {
  // Create variable and assign page object
  const setupPage = new SetupWizardPage(page);

  // 1. Complete user setup
  await setupPage.completeSetup(ENV.USERNAME, ENV.PASSWORD);

  // 2. Validate user is on dashboard
  await expect(
    page.getByRole("heading", { name: "Quick Stats" }),
  ).toBeVisible();
});
