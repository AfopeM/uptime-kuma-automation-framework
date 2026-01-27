import { ENV } from "../utils/config";
import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";

test.describe("Login Negative Test Cases", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("button", { name: "Log in" })).toBeVisible();
  });

  test("should fails if username is invalid", async ({ page }) => {
    loginPage = new LoginPage(page);

    await loginPage.login("invalidUsername", ENV.PASSWORD);
    await loginPage.assertLoginFailure();
  });

  test("should fails if password is invalid", async ({ page }) => {
    loginPage = new LoginPage(page);

    await loginPage.login(ENV.USERNAME, "invalidPassword");
    await loginPage.assertLoginFailure();
  });
});
