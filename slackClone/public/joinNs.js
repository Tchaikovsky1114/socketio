const joinNs = (element, nsData) => {
  const nsEndpoint = element.getAttribute('ns');
      console.log(nsEndpoint);

      const clickedNs = nsData.find(row => row.endpoint === nsEndpoint);
      const rooms = clickedNs.rooms;

      // get the room-list div
      let roomList = document.querySelector('.room-list');
      // clear it out
      roomList.innerHTML = "";

      // loop through each room
      rooms.forEach(room => {
        roomList.innerHTML += `<li><span class="glyphicon"></span>${room.roomTitle}</li>`
      })

      localStorage.setItem('lastNs',nsEndpoint);
}