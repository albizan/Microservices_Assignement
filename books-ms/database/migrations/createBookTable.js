exports.up = function (knex, Promise) {
  return knex.schema.createTable("book", function (table) {
    table.string("id").notNullable();
    table.string("author").notNullable();
    table.string("title").notNullable();
    table.integer("total").notNullable();
    table.integer("borrowed").notNullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("book");
};
