module.exports = {
  client: "sqlite3",
  connection: ":memory:",
  useNullAsDefault: true,
  seeds: {
    directory: "./database/seeds",
  },
  migrations: {
    directory: "./database/migrations",
  },
};
