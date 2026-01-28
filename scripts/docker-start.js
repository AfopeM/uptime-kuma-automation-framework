const { execSync } = require("child_process");

try {
  console.log("📦 Starting Uptime Kuma (Docker)...");

  // Only bring up containers, do NOT delete anything
  execSync("docker compose -f docker-compose.test.yml up -d", {
    stdio: "inherit",
  });

  console.log("⏳ Waiting for Uptime Kuma to be ready (30s)...");
  execSync("wait-on http://localhost:3002 -t 30000", { stdio: "inherit" });

  console.log("✅ Uptime Kuma is LIVE at http://localhost:3002");
} catch (error) {
  console.error("❌ Failed to start environment:", error.message);
  process.exit(1);
}
