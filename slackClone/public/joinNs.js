const joinNs = (element, nsData) => {
  const nsEndpoint = element.getAttribute('ns');

  const clickedNs = nsData.find((row) => row.endpoint === nsEndpoint);

  // global so we can submit the new message to the right place
  selectedNsId = clickedNs.id;

  const rooms = clickedNs.rooms;

  // get the room-list div
  let roomList = document.querySelector('.room-list');
  // clear it out
  roomList.innerHTML = '';

  // loop through each room
  rooms.forEach((room) => {
    roomList.innerHTML += `<li class="room" namespaceId=${room.namespaceId}>
    <span class="fa-solid fa-${
      room.privateRoom ? 'lock' : 'globe'
    }"></span>${room.roomTitle}</li>`;
  });
  


  // add click listener to each room so the client can tell the server it wants to join!
  const roomNodes = document.querySelectorAll('.room');
  Array.from(roomNodes).forEach((elem) => {
    elem.addEventListener('click', (e) => {

      const namespaceId = elem.getAttribute('namespaceId');
      joinRoom(e.target.innerText, namespaceId)
    });
  });
  localStorage.setItem('lastNs', nsEndpoint);
};
