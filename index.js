const express = require('express');
const moment = require('moment');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
const cors = require('cors');
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
//format msg
function formatMessage(user, text) {
  return {
    user,
    text,
    time: moment().format('h:mm a'),
  };
}

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('App is running');
});

io.on('connection', (socket) => {
  socket.emit('me', socket.id);

  socket.on('disconnect', () => {
    socket.broadcast.emit('callEnded');
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', {
        user: 'Admin',
        text: `${user.name} has left.`,
      });
      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });

  socket.on('callUser', ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit('callUser', { signal: signalData, from, name });
  });

  socket.on('answerCall', (data) => {
    io.to(data.to).emit('callAccepted', data.signal);
  });

  //..............chat...........
  socket.on('join', ({ name, room }) => {
    console.log(name, room);
    const { user } = addUser({ id: socket.id, name, room });

    socket.join(user.room);

    // Welcome current user
    socket.emit(
      'message',
      formatMessage('FR3', `Welcome ${user ? user.name : 'Bot'}!`)
    );
    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage('FR3', `${user ? user.name : 'Bot'} has joined`)
      );
    // Send users and room info
    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
  });
  // Listen for chatMessage
  socket.on('sendMessage', (message) => {
    const user = getUser(socket.id);

    io.to(user?.room ? user.room : null).emit(
      'message',
      formatMessage(user ? user.name : 'Bot', message)
    );
  });
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
