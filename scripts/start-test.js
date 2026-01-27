const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const TEST_DATA_DIR = path.resolve(__dirname, "../test-data");

try {
  // 1. Stop old containers and wipe old data
  console.log("🚀 Cleaning old test environment...");
  execSync("docker compose -f docker-compose.test.yml down -v", {
    stdio: "inherit",
  });

  // 2. Hard delete test-data folder
  if (fs.existsSync(TEST_DATA_DIR)) {
    console.log("🧹 Deleting test-data folder...");
    deleteFolderAndWait(TEST_DATA_DIR);
    console.log("✅ test-data deleted");
  }

  // 3. Start the container
  console.log("📦 Starting Uptime Kuma...");
  execSync("docker compose -f docker-compose.test.yml up -d", {
    stdio: "inherit",
  });

  // 4. Use the wait-on tool you installed earlier
  console.log("⏳ Waiting for Uptime Kuma to be ready (this may take 30s)...");
  execSync("wait-on http://localhost:3002 -t 30000", { stdio: "inherit" });

  console.log("✅ Uptime Kuma is LIVE at http://localhost:3002");
} catch (error) {
  console.error("❌ Failed to start environment:", error.message);
  process.exit(1);
}

// ================
// Helper Functions
// ================
function sleep(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

function deleteFolderAndWait(dir, timeoutMs = 10000) {
  const start = Date.now();

  while (fs.existsSync(dir)) {
    try {
      fs.rmSync(dir, { recursive: true, force: true });
    } catch (err) {
      // swallow and retry
    }

    if (!fs.existsSync(dir)) {
      return;
    }

    if (Date.now() - start > timeoutMs) {
      throw new Error(`Timed out deleting folder: ${dir}`);
    }

    console.log("⏳ Waiting for Windows file lock release...");
    sleep(500);
  }
}
