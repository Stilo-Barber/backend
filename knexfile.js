// Update with your config settings.

module.exports = {
  client: "mysql",
  connection: {
    // host: "db4free.net",
    // database: "barberstilo",
    // user: "barberstilo",
    // password: "barberstilo",
    host: "localhost",
    database: "stilobarber",
    user: "luca",
    password: "root",
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
  },
};
