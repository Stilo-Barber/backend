module.exports = (app) => {

  const save = async (req, res) => {
    const services = { ...req.body };
      app
        .db("services")
        .insert(services)
        .then((_) => res.status(200).send("Serviço adicionado com sucesso"))
        .catch((err) => res.status(500).send(err));
  };

  const updateService = async (req, res) => {
    const services = { ...req.body };

    if (req.params.id) services.id = req.params.id;

    if (services.id) {
      app
        .db("services")
        .update(services)
        .where({ id: services.id })
        .then((_) => res.status(200).send("Serviço atualizado com sucesso"));
    } else {
      res.status(400).send("Serviço não encontrado");
    }
  };

  const get = (req, res) => {
    app
      .db("services")
      .select("*")
      .then((services) => res.json(services))
      .catch((err) => res.status(500).send(err));
  };

  const getById = (req, res) => {
    app
      .db("services")
      .select("*")
      .where({ id: req.params.id })
      .then((services) => res.json(services))
      .catch((err) => res.status(500).send(err));
  };

  const remove = async (req, res) => {
    try {
      const rowsDeleted = await app
        .db("services")
        .where({ id: req.params.id })
        .del();

      res.status(200).send("Deletado com sucesso");
    } catch (msg) {
      res.status(500).send(msg);
    }
  };

  return { save, get, remove, getById, updateService };
};
