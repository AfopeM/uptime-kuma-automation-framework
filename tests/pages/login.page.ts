import { BasePage } from "./base.page";
import { expect, Page, Locator } from "@playwright/test";

export class LoginPage extends BasePage {
  // Create variables and assign locators
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);

    this.usernameInput = page.getByLabel("Username", { exact: true });
    this.passwordInput = page.getByLabel("Password", { exact: true });

    this.loginButton = this.page.getByRole("button", {
      name: "Log in",
    });
  }

  async login(username: string, password: string) {
    // 1. Fill locator input fields
    await this.fillInput(this.usernameInput, username);
    await this.fillInput(this.passwordInput, password);

    // 2. Click button
    await this.loginButton.click();
  }

  async assertLoginSuccess() {
    // 1. Verify redirect to dashboard
    await expect(this.page).toHaveURL("/dashboard");

    // 2. Verify dashboard is visible
    await expect(
      this.page.getByRole("heading", { name: "Quick Stats" }),
    ).toBeVisible();
  }

  async assertLoginFailure() {
    // 1. Verify alert message is visible
    await expect(this.page.getByRole("alert")).toHaveText(
      "Incorrect username or password.",
    );
  }
}
