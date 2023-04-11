const express = require('express');
const app = express();

// import { Server } from "socket.io"; === Server
const socketio = require('socket.io');

app.use(express.static(__dirname + '/public'));
const expressServer = app.listen(8001);







// io = the lowercase server in the docs. 
const io = socketio(expressServer,{
  // cors: {
    // origin: ["https://example.com", "https://dev.example.com"],
    // allowedHeaders: ["my-custom-header"],
    // credentials: true
  // }
});

// io = the lowercase server in the docs. 
io.on('connection', (socket) => {
  console.log(socket.id,"has connected");
  // socket.emit('messageFromServer',{ data: 'Welcome to the socket server!' })
  
  socket.on('newMessageToServer',(dataFromClient) => {
    console.log('Data:',dataFromClient);
    io.emit('newMessageToClients', { text: dataFromClient.text })
  })
})