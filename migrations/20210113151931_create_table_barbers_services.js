exports.up = function (knex) {
  return knex.schema.createTable("barbers_services", (table) => {
    table.increments("id").primary();
    table.integer("barberId").unsigned().notNullable();
    table.foreign("barberId").references("id").inTable("barbers");
    table.integer("serviceId").unsigned().notNullable();
    table.foreign("serviceId").references("id").inTable("services");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("barbers_services");
};
