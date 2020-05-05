const express = require("express");
const path = require("path");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const socketio = require("socket.io");

const app = express();

const server = http.createServer(app);
const io = socketio(server).sockets;

// DB config
const db = require("./config/db");

// Load configuration files
dotenv.config({ path: "./config.env" });

// Dev logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Cors
app.use(cors());
// Bodyparser Middleware
app.use(express.json());

// Use Routes
app.use("/", require("./routes/index"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

/** Chatroom routes */
require("./middleware/socket")(app, io, db);

// Port configuration
const PORT = process.env.PORT || 6000;

server.listen(PORT, () => console.warn(`Server started on port ${PORT}`));
