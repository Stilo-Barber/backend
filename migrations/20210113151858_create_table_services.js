exports.up = function (knex) {
  return knex.schema.createTable("services", (table) => {
    table.increments("id").primary();
    table.string("name").notNull();
    table.float("price").notNull();
    table.integer("time_in_minutes").notNull()
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("services");
};
