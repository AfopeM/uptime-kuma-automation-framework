import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env.test") });

function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `❌ Missing Environment Variable: ${name} is not defined in .env.test`,
    );
  }
  return value;
}

// Now each one is validated individually
export const ENV = {
  USERNAME: getEnvVar("KUMA_USERNAME"),
  PASSWORD: getEnvVar("KUMA_PASSWORD"),
  URL: getEnvVar("KUMA_URL"),
};
