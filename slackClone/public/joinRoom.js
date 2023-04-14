const joinRoom = async (roomTitle, namespaceId) => {
  console.log(roomTitle, namespaceId);


const ackResp = await nameSpaceSockets[namespaceId].emitWithAck('joinRoom',roomTitle);
  console.log(ackResp);
  document.querySelector('.curr-room-num-users').innerHTML = `<span class="fa-solid fa-user"></span> ${ackResp.numUsers}`
  document.querySelector('.curr-room-text').innerHTML = roomTitle;
  
  // nameSpaceSockets[namespaceId].emit('joinRoom',roomTitle, (res) => {
  //   console.log(res);
  // document.querySelector('.curr-room-num-users').innerHTML = `<span class="fa-solid fa-user"></span> ${res.numUsers}`
  // document.querySelector('.curr-room-text').innerHTML = roomTitle;  
  // });
}