const express = require('express');

const app = express();

const server = app.listen(4000, () => console.log('Listening to port 4000'));

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});

io.on('connect', socket => {
  socket.on('ownerExist', data => {
    socket.broadcast.emit('shouldBeOwner', data);
  });

  socket.on('videoLink', data => {
    socket.broadcast.emit('setVideoLink', data);
  });

  socket.on('isVideoPlaying', data => {
    socket.broadcast.emit('setIsVideoPlaying', data);
  });
});
