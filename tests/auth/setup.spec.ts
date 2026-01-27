import { ENV } from "../utils/config";
import { test } from "../fixtures/setup.fixture";

test.describe("Initial Database Setup", () => {
  test("should successfully setup db and create admin user", async ({
    setupPage,
  }) => {
    await (
      await setupPage.setupDatabase()
    ).createAdmin(ENV.USERNAME, ENV.PASSWORD);

    await setupPage.assertLoginSuccess();
  });
});
