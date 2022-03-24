const io = require("socket.io-client");

class Socket {

  constructor() {}

  connect() {
    this.connection = io.connect("{{socket-url}}");
    this.connection.on("connect", () => {
      this.connection.emit('client-register');
    });
  }

  selectCharacter(character) {
    if (this.connection) {
      this.connection.emit('select-character', character);
    }
  }

  startGame(character) {
    if (this.connection) {
      this.connection.emit('start-game', character);
    }
  }

  artefactShown(id) {
    if (this.connection) {
      this.connection.emit('artefact-card', id);
    }
  }

}

// singleton design pattern -> return socket instance
window.rnt.socket = window.socket || new Socket();
export default window.socket;