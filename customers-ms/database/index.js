const Knex = require("knex");
const config = require("./config");
const testConfig = require("./test-config");
let db;

if (process.env.NODE_ENV === "test") {
  db = Knex(testConfig);
} else {
  db = Knex(config);
}

module.exports = db;
