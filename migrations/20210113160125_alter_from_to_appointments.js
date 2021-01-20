
exports.up = function(knex) {
  return knex.schema.alterTable("appointments", (table) => {
    table.string("from").alter();
    table.string("to").alter();
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable("appointments", (table) => {
    table.timestamp("from").alter();
    table.timestamp("to").alter();
  });
};
