// Update with your config settings.

module.exports = {
  client: "mysql",
  connection: {
    host: "db4free.net",
    database: "barberstilo",
    user: "barberstilo",
    password: "barberstilo",
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
  },
};
