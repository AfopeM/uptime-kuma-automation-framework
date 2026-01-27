import { ENV } from "../utils/config";
import { test } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { SetupWizardPage } from "../pages/setup-wizard.page";

test.describe("Initial Database Setup", () => {
  test("should successfully setup db and create admin user", async ({
    page,
  }) => {
    const setupPage = new SetupWizardPage(page);
    await (
      await setupPage.setupDatabase()
    ).createAdmin(ENV.USERNAME, ENV.PASSWORD);

    const loginPage = new LoginPage(page);
    await loginPage.assertLoginSuccess();
  });
});
