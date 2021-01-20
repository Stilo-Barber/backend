module.exports = (app) => {

  const save = async (req, res) => {
    const appointment = { ...req.body };

    app
      .db("appointments")
      .insert(appointment)
      .then((_) => res.status(200).send("Horário adicionado com sucesso"))
      .catch((err) => res.status(500).send(err));
  };

  const updateAppointment = async (req, res) => {
    const appointment = { ...req.body };

    if (appointment.id) {
      app
        .db("appointments")
        .update(appointment)
        .where({ id: appointment.id })
        .then((_) => res.status(200).send("Horário atualizado com sucesso"));
    } else {
      res.status(400).send("Horário não encontrado");
    }
  };

  const get = (req, res) => {
    app
      .db("appointments")
      .select("*")
      .then((appointments) => res.json(appointments))
      .catch((err) => res.status(500).send(err));
  };

  const getById = (req, res) => {
    app
      .db("appointments")
      .select("*")
      .where({ id: req.params.id })
      .then((appointment) => res.json(appointment))
      .catch((err) => res.status(500).send(err));
  };

  const getByBarberId = (req, res) => {
    app
      .db("appointments")
      .select("*")
      .where({ barberId: req.params.barberId })
      .then((appointments) => res.json(appointments))
      .catch((err) => res.status(500).send(err));
  };
  
  const remove = async (req, res) => {
    try {
      const rowsDeleted = await app
        .db("appointments")
        .where({ id: req.params.id })
        .del();

      try {
        existsOrError(rowsDeleted, "Horário não foi encontrado");
      } catch (msg) {
        return res.status(400).send(msg);
      }

      res.status(200).send("Deletado com sucesso");
    } catch (msg) {
      res.status(500).send(msg);
    }
  };

  return { save, get, remove, getById, getByBarberId, updateAppointment};
};
