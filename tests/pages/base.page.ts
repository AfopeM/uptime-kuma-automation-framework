import { Page, Locator } from "@playwright/test";

export class BasePage {
  constructor(protected page: Page) {}

  // Generic form fill
  async fillInput(locator: Locator, value: string) {
    await locator.fill(value);
  }
}
