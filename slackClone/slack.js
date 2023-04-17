const express = require('express');
const app = express();
const socketio = require('socket.io');
const namespaces = require('./data/namespaces');
const Room = require('./classes/Room');

app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(9000);
const io = socketio(expressServer);


app.get('/change-ns', (req,res) => {
  namespaces[0].addRoom(new Room(0, 'Delete Articles',0))
  io.of(namespaces[0].endpoint).emit('nsChange', namespaces[0]);
  res.json(namespaces[0]);
})

io.on('connection', (socket) => {  
  socket.emit('nsList',namespaces)
});

namespaces.forEach((namespace) => {
  io.of(namespace.endpoint).on('connection', (socket) => {
    socket.on('joinRoom', async(roomObj,ackCallBack) => {

      // fetch the history

      const thisNs = namespaces[roomObj.namespaceId];
      const thisRoomObj = thisNs.rooms.find(room => room.roomTitle === roomObj.roomTitle);
      const thisRoomHistory = thisRoomObj.history;

      
      const rooms = socket.rooms;
      let i = 0;
      rooms.forEach(room => {
        if(i !== 0) {
          socket.leave(room);
        }
        i++
      })
      // join the room!
      // Note - roomTitle is coming from the client. Which is NOT safe.
      socket.join(roomObj.roomTitle);

      // fetch the number of sockets in this room
      const sockets = await io.of(namespace.endpoint).in(roomObj.roomTitle).fetchSockets()
      const socketCount = sockets.length
      ackCallBack({numUsers:socketCount,thisRoomHistory},);
    })

    socket.on('newMessageToRoom', messageObj => {
      console.log(messageObj);
      const rooms = socket.rooms;
      const currentRoom = [...rooms][1];
      io.of(namespace.endpoint).in(currentRoom).emit('messageToRoom',messageObj)

      // add this message to this room's history
      const thisNs = namespaces[messageObj.selectedNsId]
      const thisRoom = thisNs.rooms.find((room) => room.roomTitle === currentRoom);
      console.log('thisRoom',thisRoom);
      thisRoom.addMessage(messageObj);
    })
  })
})


