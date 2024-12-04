const formatMessage = require("./utils/message");
const path = require("path");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const users = [];

//get current user
function getCurrentUser(id) {
  return users.find((user) => user.id == id);
}

//user leaves chat
function userLeave(id) {
  const index = users.findIndex((item) => item.id === id);

  if (index != -1) {
    users.splice(index, 1);
  }
}

//Get room users
function getRoomUser(room) {
  return users.filter((data) => data.room === room);
}

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//set static folder
app.use(express.static(path.join(__dirname, "public")));

//Run when client connect
io.on("connect", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    const id = socket.id;
    const user = { id, username, room };
    users.push(user);

    socket.join(user.room);

    //broadcast when user connect
    io.to(user.room).emit("message", `${user.username} has joined the chat`, "");

    //send user and room info
    io.to(user.room).emit("roomUsers", { room: user.room, users: users });
  });

  //listen for chat message
  socket.on("chatMsg", (msg) => {
    const user = getCurrentUser(socket.id);
    io.to(user.room).emit("message", msg, user.username);
  });

  //runs when client disconnect
  socket.on("disconnect", () => {
    const user = getCurrentUser(socket.id);
    userLeave(socket.id);
    if (user) {
      io.to(user.room).emit("message", `${user.username} has left the chat`, "");

      //send user and room info
      io.to(user.room).emit("roomUsers", { room: user.room, users: users });
    }
  });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
