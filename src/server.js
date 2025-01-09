import app from "./app.js";
import http from "http";
import { Server } from "socket.io";
import { getCurrentUser, getRoomUser, userLeave, addUser } from "./utils/users.js";
import dotenv from "dotenv";
dotenv.config({path: "./.env"});

const server = http.createServer(app);
const io = new Server(server);

//Run when client connect
io.on("connect", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    const id = socket.id;
    const user = { id, username, room };
    addUser(user);

    socket.join(user.room);

    //broadcast when user connect
    io.to(user.room).emit("message", `${user.username} has joined the chat`, "");

    //send user and room info
    io.to(user.room).emit("roomUsers", { room: user.room, users: getRoomUser(user.room) });
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
      io.to(user.room).emit("roomUsers", { room: user.room, users: getRoomUser(user.room) });
    }
  });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
