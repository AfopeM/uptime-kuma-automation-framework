import { ENV } from "../utils/config";
import { expect, Page } from "@playwright/test";
import { test as base } from "@playwright/test";

type AuthFixtures = {
  authPage: Page;
};

export const test = base.extend<AuthFixtures>({
  authPage: async ({ page }, use) => {
    // Navigate to Base URL
    await page.goto("/");

    // 1. Create variables and assign locators
    await page.getByLabel("Username").fill(ENV.USERNAME);
    await page.getByLabel("Password").fill(ENV.PASSWORD);

    // 2. Click button
    await page.getByRole("button", { name: "Login" }).click();

    // 3. Validate redirect to dashboard
    await expect(page).toHaveURL(/.*dashboard/);

    // 4. Validate user is on dashboard
    await expect(
      page.getByRole("heading", { name: "Quick Stats" }),
    ).toBeVisible();

    // Use the page
    await use(page);
  },
});
