var socketio = require('socket.io');
var io;
var currentRoom = {};

exports.listen = function(server) {
  io = socketio.listen(server);
  io.sockets.on('connection', function(socket) {
    console.log("a client has connected to me.");
    handleRoomJoin(socket);
    handleRoomBroadcast(socket);
  });
}

function handleRoomJoin(socket) {
  socket.on('join', function(room) {
    joinRoom(socket, room);
  });
};

function joinRoom(socket, room) {
  socket.leave(currentRoom[socket.id]);
  socket.join(room);
  currentRoom[socket.id] = room;
  console.log(socket.id + " has joined " + room);
};

function handleRoomBroadcast(socket) {
  socket.on('broadcastNext', function(msg) {
    sendNext(socket, msg);
  });
};

function sendNext(socket, msg) {
  console.log(msg.room);
  io.to(msg.room).emit('jumpTo', msg);
};
