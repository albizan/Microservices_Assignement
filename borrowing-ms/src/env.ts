import { resolve } from "path";
import { config } from "dotenv";

if (process.env.NODE_ENV !== "production") {
  // Load env variables from local .env file
  console.log("Loading local env vars...");
  config({ path: resolve(__dirname, "../.env") });
}
