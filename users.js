const users = [];

//user join the chat
const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const user = { id, name, room };

  users.push(user);

  return { user };
};

//user leaves the chat
const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0]; //get the zero index user
};

//current user
const getUser = (id) => users.find((user) => user.id === id);
// Get room users
const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
