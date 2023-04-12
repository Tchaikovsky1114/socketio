const express = require('express');
const app = express();
const socketio = require('socket.io');
app.use(express.static(__dirname + '/public'));
const expressServer = app.listen(8001);
const io = socketio(expressServer);


// default namespace = .of("/")
io.on('connection', (socket) => {
  socket.join('chat');
  io.of('/').to('chat').emit('welcomeToChatRoom',{});
  // mainspace에 유저가 접속했음을 admin namespace에 전달할 수 있다.
  io.of("/admin").emit("userJoinedMainNs", () => {console.log(socket.id,"has joined main namespace.")})
  socket.on('newMessageToServer',(dataFromClient) => {
    console.log('Data:',dataFromClient);
    io.emit('newMessageToClients', { text: dataFromClient.text })
  })
})

io.of('/admin').on('connection', (socket) => {
  console.log(socket.id, "has joinded /admin namespaces");
  io.of("admin").emit('messageToClientsFromAdmin',() => {});
})
