const knex = require("../config/db");

module.exports = (app) => {

  const save = async (req, res) => {
    const schedules = req.body;

    app
      .db("schedule")
      .insert(schedules)
      .then((_) => res.status(200).send("Horário adicionado com sucesso"))
      .catch((err) => res.status(500).send(err));
      
  };

  const updateSchedule = async (req, res) => {
    const schedules = [ ...req.body ];

    try {
      schedules.forEach(async (schedule) => 
         await app
          .db("schedule")
          .update(schedule)
          .where({ id: schedule.id })
      )

      res.status(200).send("Horário atualizado  com sucesso");
    } catch (msg) {
      res.status(500).send(msg);
    }

    
  };

  const get = (req, res) => {
    app
      .db("schedule")
      .select("*")
      .then((schedule) => res.json(schedule))
      .catch((err) => res.status(500).send(err));
  };

  const getById = (req, res) => {
    app
      .db("schedule")
      .select("*")
      .where({ id: req.params.id })
      .then((schedule) => res.json(schedule))
      .catch((err) => res.status(500).send(err));
  };

  const getByBarberId = (req, res) => {
    app
      .db("schedule")
      .select("*")
      .where({ barberId: req.params.barberId })
      .then((schedule) => res.json(schedule))
      .catch((err) => res.status(500).send(err));
  };

  const remove = async (req, res) => {
    try {
      const rowsDeleted = await app
        .db("schedule")
        .where({ id: req.params.id })
        .del();

      res.status(200).send("Deletado com sucesso");
    } catch (msg) {
      res.status(500).send(msg);
    }
  };

  return { save, get, remove, getById, getByBarberId, updateSchedule };
};
