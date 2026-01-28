const fs = require("fs");
const path = require("path");

const TEST_DATA_DIR = path.resolve(__dirname, "../test-data");
const STORAGE_STATE = path.resolve(__dirname, "../storageState.json");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function deleteFolderAndWait(dir, timeoutMs = 10000) {
  const start = Date.now();

  while (fs.existsSync(dir)) {
    try {
      fs.rmSync(dir, { recursive: true, force: true });
    } catch (err) {
      // ignore, likely locked
    }

    if (!fs.existsSync(dir)) return;

    if (Date.now() - start > timeoutMs) {
      throw new Error(`Timed out deleting folder: ${dir}`);
    }

    console.log(`⏳ Waiting for file lock release on ${dir}...`);
    await sleep(500);
  }
}

function deleteFile(filePath) {
  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
      console.log(`✅ Deleted ${filePath}`);
    } catch (err) {
      console.error(`❌ Failed to delete ${filePath}:`, err);
    }
  }
}

(async () => {
  console.log("🧹 Resetting test environment...");

  if (fs.existsSync(TEST_DATA_DIR)) {
    console.log("Deleting test-data folder...");
    try {
      await deleteFolderAndWait(TEST_DATA_DIR, 15000); // 15s timeout
      console.log("✅ test-data deleted");
    } catch (err) {
      console.error("❌ Could not delete test-data folder:", err);
      console.log(
        "💡 Try closing programs that might be using test-data (VS Code, terminals, Explorer preview).",
      );
      process.exit(1);
    }
  }

  deleteFile(STORAGE_STATE);

  console.log("✅ Test environment reset complete!");
})();
