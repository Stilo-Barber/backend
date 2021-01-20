module.exports = (app) => {
  app.post("/session", app.api.auth.signin);
  app.post("/validateToken", app.api.auth.validateToken);
  app.post("/register", app.api.users.save);

  app
    .route("/users")
    .all(app.config.passport.authenticate())
    .get(app.api.users.get)
    .post(app.api.users.save);

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

  app
    .route("/services")
    .all(app.config.passport.authenticate())
    .get(app.api.services.get)
    .post(app.api.services.save);

  app
    .route("/services/:id")
    .all(app.config.passport.authenticate())
    .put(app.api.services.updateService)
    .delete(app.api.services.remove)
    .get(app.api.services.getById);

  app
    .route("/barbers/services")
    .all(app.config.passport.authenticate())
    .get(app.api.barbers_services.get)
    .post(app.api.barbers_services.save);

  app
    .route("/barbers/services/:id")
    .all(app.config.passport.authenticate())
    .delete(app.api.barbers_services.remove)
    .get(app.api.barbers_services.getById);
  
  app
    .route("/barbers/services/all/:barberId")
    .all(app.config.passport.authenticate())
    .get(app.api.barbers_services.getServicesByBarberId)
    .put(app.api.barbers_services.updateBarbersServices)
  
  app
    .route("/schedule")
    .all(app.config.passport.authenticate())
    .get(app.api.schedule.get)
    .post(app.api.schedule.save);
  
  app
    .route("/schedule/all/:barberId")
    .all(app.config.passport.authenticate())
    .get(app.api.schedule.getByBarberId)
    .put(app.api.schedule.updateSchedule)

  app
    .route("/schedule/:id")
    .all(app.config.passport.authenticate())
    .delete(app.api.schedule.remove)
    .get(app.api.schedule.getById);

  app
    .route("/appointments")
    .all(app.config.passport.authenticate())
    .get(app.api.appointments.get)
    .post(app.api.appointments.save);

  app
    .route("/appointments/:id")
    .all(app.config.passport.authenticate())
    .put(app.api.appointments.updateAppointment)
    .delete(app.api.appointments.remove)
    .get(app.api.appointments.getById);

  app
    .route("/appointments/all/:barberId")
    .all(app.config.passport.authenticate())
    .get(app.api.appointments.getByBarberId)
};
