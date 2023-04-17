const joinRoom = async (roomTitle, namespaceId) => {
  console.log(roomTitle, namespaceId);


const ackResp = await nameSpaceSockets[namespaceId].emitWithAck('joinRoom',{roomTitle,namespaceId});
  
  document.querySelector('.curr-room-num-users').innerHTML = `
  <span class="fa-solid fa-user"></span> ${ackResp.numUsers}`
  document.querySelector('.curr-room-text').innerHTML = roomTitle;
  
  // clear other room's history.
  // we get back the room history in the ack
  document.querySelector('#messages').innerHTML = '';
  
  ackResp.thisRoomHistory.forEach((message) => {
    document.querySelector('#messages').innerHTML += buildMessageHtml(message);
  })

  // nameSpaceSockets[namespaceId].emit('joinRoom',roomTitle, (res) => {
  //   console.log(res);
  // document.querySelector('.curr-room-num-users').innerHTML = `<span class="fa-solid fa-user"></span> ${res.numUsers}`
  // document.querySelector('.curr-room-text').innerHTML = roomTitle;  
  // });

  
}