module.exports = (app) => {
  app.post("/session", app.api.auth.signin);
  app.post("/validateToken", app.api.auth.validateToken);
  app.post("/register", app.api.users.save);

  app
    .route("/users")
    .all(app.config.passport.authenticate())
    .get(app.api.users.get);

  app
    .route("/users/:id")
    .all(app.config.passport.authenticate())
    .put(app.api.users.updateUser)
    .delete(app.api.users.remove)
    .get(app.api.users.getById);

  app
    .route("/barbers")
    .all(app.config.passport.authenticate())
    .get(app.api.barbers.get)
    .post(app.api.barbers.save);

  app
    .route("/barbers/:id")
    .all(app.config.passport.authenticate())
    .put(app.api.barbers.updateBarber)
    .delete(app.api.barbers.remove)
    .get(app.api.barbers.getById);
};
