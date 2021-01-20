exports.up = function (knex) {
  return knex.schema.createTable("schedule", (table) => {
    table.increments("id").primary();
    table.integer("barberId").unsigned().notNullable();
    table.foreign("barberId").references("id").inTable("barbers");
    table.time("from").notNull();
    table.time("to").notNull();
    table.integer("day").notNull();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("schedule");
};
