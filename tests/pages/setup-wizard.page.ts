import { BasePage } from "./base.page";
import { expect } from "@playwright/test";
import { ENV } from "../utils/config";

export class SetupWizardPage extends BasePage {
  // Create variables and assign locators
  private usernameInput = this.page.getByLabel("Username", {
    exact: true,
  });
  private passwordInput = this.page.getByLabel("Password", {
    exact: true,
  });
  private repeatPasswordInput = this.page.getByLabel("Repeat Password", {
    exact: true,
  });

  async setupDatabase() {
    // Navigate to setup database URL
    await this.page.goto(ENV.URL);

    // 1. Click text
    await this.page.getByText("SQLite", { exact: true }).click();

    // 2. Click button
    await this.page.getByRole("button", { name: "Next" }).click();

    // 3. Validate redirect to dashboard
    await expect(this.page).toHaveURL(/.*setup/, { timeout: 60000 });

    return this;
  }

  async createAdmin(username: string, password: string) {
    // 1. Fill locator input fields
    await this.fillInput(this.usernameInput, username);
    await this.fillInput(this.passwordInput, password);
    await this.fillInput(this.repeatPasswordInput, password);

    // 2. Click button
    await this.page.getByRole("button", { name: "Create" }).click();
  }
}
