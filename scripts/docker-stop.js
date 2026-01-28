
const { execSync } = require("child_process");

try {
  console.log("🛑 Stopping Uptime Kuma (Docker)...");

  // Stop and remove containers defined in the compose file
  execSync("docker compose -f docker-compose.test.yml down", {
    stdio: "inherit",
  });

  console.log("✅ Uptime Kuma containers stopped and removed");
} catch (error) {
  console.error("❌ Failed to stop environment:", error.message);
  process.exit(1);
}
