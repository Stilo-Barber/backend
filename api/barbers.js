module.exports = (app) => {
  const { existsOrError, notExistsOrError } = app.api.validation;

  const save = async (req, res) => {
    const barbers = { ...req.body };

    if (req.params.id) barbers.id = req.params.id;

    try {
      existsOrError(barbers.name, "Nome não informado");
      existsOrError(barbers.email, "E-mail não informado");
    } catch (msg) {
      return res.status(400).send(msg);
    }

    if (barbers.id) {
      app
        .db("barbers")
        .update(barbers)
        .where({ id: barbers.id })
        .then((_) => res.status(200).send("Barbeiro atualizado com sucesso"));
    } else {
      app
        .db("barbers")
        .insert(barbers)
        .returning("id")
        .then((id) => res.status(200).send(id))
        .catch((err) => res.status(500).send(err));
    }
  };

  const updateBarber = async (req, res) => {
    const barbers = { ...req.body };

    if (req.params.id) barbers.id = req.params.id;

    try {
      existsOrError(barbers.name, "Nome não informado");
      existsOrError(barbers.email, "E-mail não informado");
    } catch (msg) {
      return res.status(400).send(msg);
    }

    if (barbers.id) {
      app
        .db("barbers")
        .update(barbers)
        .where({ id: barbers.id })
        .then((_) => res.status(200).send("Barbeiro atualizado com sucesso"));
    } else {
      res.status(400).send("Barbeiro não encontrado");
    }
  };

  const get = (req, res) => {
    app
      .db("barbers")
      .select("id", "name", "email", "image", "phone")
      .then((barbers) => res.json(barbers))
      .catch((err) => res.status(500).send(err));
  };

  const getById = (req, res) => {
    app
      .db("barbers")
      .select("id", "name", "email", "image", "phone")
      .where({ id: req.params.id })
      .then((barbers) => res.json(barbers))
      .catch((err) => res.status(500).send(err));
  };

  const remove = async (req, res) => {
    try {
      const rowsDeleted = await app
        .db("barbers")
        .where({ id: req.params.id })
        .del();

      try {
        existsOrError(rowsDeleted, "Barbeiro não foi encontrado");
      } catch (msg) {
        return res.status(400).send(msg);
      }

      res.status(200).send("Deletado com sucesso");
    } catch (msg) {
      res.status(500).send(msg);
    }
  };

  return { save, get, remove, getById, updateBarber };
};
