var Pres = function(socket) {
  this.socket = socket;
//keep track of this id
  socket.on('jumpTo', function(state) {
    $('#lesson').jmpress('goTo','#' + state.id);
    $('#lesson').jmpress('setSubstep', state.substep);
  });
}

Pres.prototype.joinRoom = function(room) {
  this.room = room;
  this.socket.emit('join', room); 
};

Pres.prototype.sendNext = function() {
  var slide = $('#lesson').jmpress('next');
  var substep = $('#lesson').jmpress('getSubstep');
  var nextId = slide[0].id;
  this.socket.emit('broadcastNext', {"room": this.room, "id": nextId, "substep": substep});
};

