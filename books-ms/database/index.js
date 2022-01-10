const Knex = require("knex");
const config = require("./config");
const testConfig = require("./test-config");
let db;

if (process.env.NODE_ENV === "test") {
  db = Knex(testConfig);
} else {
  db = Knex(config);
}

async function checkConnection() {
  try {
    await db.select("*").from("book").limit(1);
  } catch (error) {
    throw new Error("Unable to establish database connection");
  }
}

module.exports = db;
module.exports.checkConnection = checkConnection;
