exports.up = function (knex) {
  return knex.schema.createTable("barbers", (table) => {
    table.increments("id").primary();
    table.string("name").notNull();
    table.string("email").notNull().unique();
    table.string("image");
    table.string("phone");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("barbers");
};
