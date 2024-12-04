const messages = document.getElementById("messages");
const form = document.getElementById("form");
const input = document.getElementById("input");
const room_name = document.getElementById("room_name");
const leave = document.getElementById("leave");

//get username and room from url
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

const socket = io();

//join chatroom
socket.emit('joinRoom', {username, room});

//getting users
socket.on('roomUsers', (data) => {
    room_name.textContent = data.room;
})

socket.on("message", (msg, usr) => {
  console.log(msg);
  const item = document.createElement("li");
  let chatmsg = usr;
  if (usr) {
    chatmsg += ": "
  }
  chatmsg += msg;
  item.textContent = chatmsg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input.value) {
    const chat = input.value;

    //emitting message to server
    socket.emit("chatMsg", chat);

    //clearing input
    input.value = "";
    input.focus();
  }
});

leave.addEventListener("click", ()=>{
    window.history.back();
});
