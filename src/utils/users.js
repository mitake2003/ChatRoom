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

//add users
function addUser(user) {
    users.push(user);
}

//get All users
function getAllUsers() {
    return users;
}
export {getCurrentUser, getRoomUser, userLeave, addUser, getAllUsers};