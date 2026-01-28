import { BasePage } from "./base.page";
import { expect, Page, Locator } from "@playwright/test";

export class SetupWizardPage extends BasePage {
  // Create variables and assign locators
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly repeatPasswordInput: Locator;

  private readonly nextButton: Locator;
  private readonly createButton: Locator;

  constructor(page: Page) {
    super(page);

    this.usernameInput = page.getByLabel("Username", { exact: true });
    this.passwordInput = page.getByLabel("Password", { exact: true });
    this.repeatPasswordInput = page.getByLabel("Repeat Password", {
      exact: true,
    });

    this.nextButton = page.getByRole("button", { name: "Next" });
    this.createButton = page.getByRole("button", { name: "Create" });
  }

  async setupDatabase() {
    // Navigate to setup database URL
    await this.page.goto("/");

    // Verify user is on setup database page
    const dbChoiceTitle = this.page.getByText(
      "Which database would you like to use?",
    );

    await dbChoiceTitle.waitFor({ state: "visible", timeout: 60_000 });
    await expect(dbChoiceTitle).toBeVisible();

    // 1. Click text
    await this.page.getByText("SQLite", { exact: true }).click();

    // 2. Click button
    await this.nextButton.click();

    await this.page
      .getByText("Setting up the database", { exact: false })
      .waitFor({ state: "detached", timeout: 60_000 });

    // 3. Validate redirect to dashboard
    await expect(
      this.page.getByText("Create your admin account"),
    ).toBeVisible();

    return this;
  }

  async createAdmin(username: string, password: string) {
    // 1. Fill locator input fields
    await this.fillInput(this.usernameInput, username);
    await this.fillInput(this.passwordInput, password);
    await this.fillInput(this.repeatPasswordInput, password);

    // 2. Click button
    await this.createButton.click();
  }
}
