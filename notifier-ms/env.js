const { resolve } = require("path");

if (process.env.NODE_ENV !== "production") {
  // Load env variables from local .env file
  console.log("Loading local env vars\n");
  require("dotenv").config({ path: resolve(__dirname, "./.env") });
}
