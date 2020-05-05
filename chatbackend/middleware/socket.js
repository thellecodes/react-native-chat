const uuid = require("uuid");
const auth = require("./auth");

const { addUser, removeUser, getUsersInRoom } = require("../helpers/users");
module.exports = (app, io, db) => {
  io.on("connection", function (socket) {
    // "6YDAM1LVauUWTnQoAAAC",
    socket.on("join", ({ name, room }, callback) => {
      const { error, user } = addUser({
        id: socket.id,
        name,
        room,
      });

      if (error) return callback(error);

      socket.join(user.room);

      socket.emit("message", [
        {
          id: uuid.v4(),
          name: "@vendorBot",
          msg: `${user.name}, welcome to boltskills ${user.room} room.`,
          msgid: uuid.v4(),
          date: "your own date",
          type: "bot",
          chatUser: user.name,
        },
      ]);

      socket.broadcast.to(user.room).emit("message", [
        {
          id: uuid.v4(),
          name: "@vendorBot",
          msg: `${user.name}, has joined bolt skills vendor app.`,
          msgid: uuid.v4(),
          date: "your own date",
          type: "bot",
          chatUser: user.name,
        },
      ]);
      callback();
    });

    socket.on("disconnect", () => {
      let getDeleteSQL = `DELETE  FROM activerooms WHERE id = ?`;

      db.query(getDeleteSQL, socket.id, (err, user) => {
        if (user) {
          io.to(user.room).emit("message", {
            id: uuid.v4(),
            name: "@vendorBot",
            msg: `${user.name}, has joined bolt skills vendor app.`,
            date: "your own date",
            msgid: uuid.v4(),
            chatUser: user.name,
          });
          io.to(user.room).emit("roomData", {
            room: user.room,
            users: getUsersInRoom(user.room),
          });
        }
      });
    });

    /**
     * @route {api/chatroom}
     * private
     */
  });
};
