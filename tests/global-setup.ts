import fs from "fs";
import path from "path";
import { ENV } from "./utils/config";
import { chromium } from "@playwright/test";
import { LoginPage } from "./pages/login.page";
import { SetupWizardPage } from "./pages/setup-wizard.page";

const STORAGE_STATE = path.join(__dirname, "../storageState.json");

export default async () => {
  // Only run setup if storage state doesn't exist
  if (fs.existsSync(STORAGE_STATE)) {
    console.log("✅ Using existing storage state, skipping setup");
    return;
  }

  const browser = await chromium.launch();
  const context = await browser.newContext({ baseURL: ENV.URL });
  const page = await context.newPage();

  // 1. Setup DB and Admin
  const setup = new SetupWizardPage(page);
  await setup.setupDatabase();
  await setup.createAdmin(ENV.USERNAME, ENV.PASSWORD);

  // 2. Confirm login works
  const loginPage = new LoginPage(page);
  await loginPage.assertLoginSuccess();

  // 3. Save storage state for later tests
  await context.storageState({ path: STORAGE_STATE });
  await browser.close();
};
