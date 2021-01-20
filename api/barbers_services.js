module.exports = (app) => {

  const save = async (req, res) => {
    const barbers_services = [...req.body ];

    app
      .db("barbers_services")
      .insert(barbers_services)
      .then((_) => res.status(200).send("Relação adicionada com sucesso"))
      .catch((err) => res.status(500).send(err));
  };

  const updateBarbersServices = async (req, res) => {
    const ids = [ ...req.body ];

    try {
      const currentBarberServices = await app
      .db("services")
      .innerJoin("barbers_services", "services.id", "=", "barbers_services.serviceId")
      .select("services.id")
      .where({ barberId: req.params.barberId })

      CBSIds = currentBarberServices.map(cbs => cbs.id)

      CBSIds.forEach(async (cbs) => {
        if(!ids.includes(cbs)){
          console.log("del", cbs)
          await app
            .db("barbers_services")
            .where({ serviceId: cbs })
            .del();
        }
      })

      ids.forEach(async (id) => {
        if(!CBSIds.includes(id)) {
          console.log("add", id)
          await app
            .db("barbers_services")
            .insert({
              "barberId": req.params.barberId,
              "serviceId": id
            })
        }
      })


      res.status(200).send("Horário atualizado  com sucesso");
    } catch (msg) {
      res.status(500).send(msg);
    }
  }  

  const get = (req, res) => {
    app
      .db("barbers_services")
      .select("*")
      .then((barbers_services) => res.json(barbers_services))
      .catch((err) => res.status(500).send(err));
  };

  const getById = (req, res) => {
    app
      .db("barbers_services")
      .select("*")
      .where({ id: req.params.id })
      .then((barbers_services) => res.json(barbers_services))
      .catch((err) => res.status(500).send(err));
  };

  const getServicesByBarberId = (req, res) => {
    app
      .db("services")
      .innerJoin("barbers_services", "services.id", "=", "barbers_services.serviceId")
      .select("*")
      .where({ barberId: req.params.barberId })
      .then((services) => res.json(services))
      .catch((err) => res.status(500).send(err));
  };

  const remove = async (req, res) => {
    try {
      const rowsDeleted = await app
        .db("barbers_services")
        .where({ id: req.params.id })
        .del();

      res.status(200).send("Deletado com sucesso");
    } catch (msg) {
      res.status(500).send(msg);
    }
  };

  return { save, updateBarbersServices, get, remove, getById, getServicesByBarberId };
};
