if (process.env.NODE_ENV !== "production") {
  // Load env variables from local .env file
  console.log("Loading local env vars...");
  require("dotenv").config();
}