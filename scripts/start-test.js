const { execSync } = require("child_process");

try {
  // Stop old containers and wipe old data
  console.log("🚀 Cleaning old test environment...");
  execSync("docker-compose -f docker-compose.test.yml down -v", {
    stdio: "inherit",
  });

  // Start the container
  console.log("📦 Starting Uptime Kuma...");
  execSync("docker-compose -f docker-compose.test.yml up -d", {
    stdio: "inherit",
  });

  // Use the wait-on tool you installed earlier
  console.log("⏳ Waiting for Uptime Kuma to be ready (this may take 30s)...");
  execSync("wait-on http://localhost:3002 -t 30000", { stdio: "inherit" });

  console.log("✅ Uptime Kuma is LIVE at http://localhost:3002");
} catch (error) {
  console.error("❌ Failed to start environment:", error.message);
  process.exit(1);
}
