const app = require("express")();
const consign = require("consign");
const db = require("./config/db");

app.db = db;




consign()
  .include("./config/passport.js")
  .then("./config/middlewares.js")
  .then("./api/validation.js")
  .then("./api")
  .then("./config/routes.js")
  .into(app);

const server = app.listen(4000, () => {
  console.log("Backend executando...");
});

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});


io.on('connection', (socket) => {
  socket.on('apt.req', (data) => {
    io.emit('apt.conf', data.reqValues);
  });
  socket.on('apt.panelres', (data) => {
    io.emit('apt.clientres', data);
  });
});