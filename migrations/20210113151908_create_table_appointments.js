exports.up = function (knex) {
  return knex.schema.createTable("appointments", (table) => {
    table.increments("id").primary();
    table.integer("userId").unsigned().notNullable();
    table.foreign("userId").references("id").inTable("users");
    table.integer("barberId").unsigned().notNullable();
    table.foreign("barberId").references("id").inTable("barbers");
    table.integer("serviceId").unsigned().notNullable();
    table.foreign("serviceId").references("id").inTable("services");
    // 1- aguardando confirmação, 2 - confirmado, 3 - cancelado/recusado
    table.integer("status").notNull();
    table.timestamp("from").notNull();
    table.timestamp("to").notNull();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("appointments");
};
