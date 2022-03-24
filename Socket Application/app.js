const { Server } = require("socket.io");

const io = new Server({
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
  transports: ["websocket", "polling"]
});

let clients = [];
const BEAMER_ROOM = 'beamer';

io.on("connection", (socket) => {
  console.info(`Client connected [id=${socket.id}]`);

  /**
   * register beamer and join the beamer room
   */
  socket.on("beamer-register", (id) => {
    if (id === '{{beamer-token}}') {
      socket.join(BEAMER_ROOM);
      socket.data.beamer = true;
      socket.emit("client-update", clients);
    }
  });

  /**
   * register a client
   */
  socket.on("client-register", () => {
    clients.push({
      id: socket.id,
      currentCharacter: null,
      started: false,
    });
  });

  /**
   * client choose a character
   */
  socket.on("select-character", (character) => {
    if (['kurt', 'egon', 'sabine', 'almut', 'hannes', 'thomas', 'frauke'].indexOf(character) === -1) {
      return;
    }

    clients.forEach((client) => {
      if (client.id === socket.id) {
        client.currentCharacter = character;
        client.started = false;
      }
    });
    socket.to(BEAMER_ROOM).emit("client-update", clients);
  });

  /**
   * client start the game
   */
  socket.on("start-game", (character) => {
    if (['kurt', 'egon', 'sabine', 'almut', 'hannes', 'thomas', 'frauke'].indexOf(character) === -1) {
      return;
    }

    clients.forEach((client) => {
      if (client.id === socket.id) {
        client.currentCharacter = character;
        client.started = true;
      }
    });
    socket.to(BEAMER_ROOM).emit("client-update", clients);
  });

  /**
   * go to an artefact card
   */
  socket.on("artefact-card", (key) => {
    if (['K1030' ,'K2021' ,'M1025' ,'M2017' ,'M3024' ,'M4022' ,'T1024' ,'T2026' ,'T3031' ,'T4036' ,'T4050' ,'A1033' ,'A2029' ,'A3021' ,'A4029' ,'H1016' ,'H2036' ,'H3029' ,'H3040' ,'H4025' ,'S1021' ,'S1122' ,'S2038' ,'S3023' ,'S4030' ,'S4040' ,'F1028' ,'F2026' ,'F3033' ,'F4032'].indexOf(key) === -1) {
      return;
    }

    socket.to(BEAMER_ROOM).emit("new-artefact", key);
  });

  /**
   * disconnect client
   */
  socket.on("disconnect", () => {
    // if beamer disconnects -> leave the beamer room
    if (socket.data.beamer) {
      socket.leave(BEAMER_ROOM);
    } else {
      clients = clients.filter((client) => {
        return client.id !== socket.id;
      });
      socket.to(BEAMER_ROOM).emit("client-update", clients);
    }
    console.info(`Client gone [id=${socket.id}]`);
  });
});

io.listen(3000);