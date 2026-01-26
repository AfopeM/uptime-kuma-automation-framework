import { BasePage } from "./base.page";
import { expect } from "@playwright/test";

export class SetupWizardPage extends BasePage {
  async completeSetup(username: string, password: string) {
    // Navigate to setup database URL
    await this.page.goto("/");

    // 1. Click text
    await this.page.getByText("SQLite", { exact: true }).click();

    // 2. Click button
    await this.page.getByRole("button", { name: "Next" }).click();

    // 3. Validate redirect to dashboard
    await expect(this.page).toHaveURL(/.*setup/, { timeout: 90_0000 });

    // Create variables and assign locators
    const usernameInput = this.page.getByLabel("Username", { exact: true });
    const passwordInput = this.page.getByLabel("Password", { exact: true });
    const repeatPasswordInput = this.page.getByLabel("Repeat Password", {
      exact: true,
    });

    // 1. Fill locator input fields
    await this.fillInput(usernameInput, username);
    await this.fillInput(passwordInput, password);
    await this.fillInput(repeatPasswordInput, password);

    // 2. Click button
    await this.page.getByRole("button", { name: "Create" }).click();

    // 3. Validate redirect to dashboard
    await expect(this.page).toHaveURL(/.*dashboard/);
  }
}
