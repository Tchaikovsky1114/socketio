const username = prompt("put your name");
const userPassword = prompt("put your password");

const socket = io('http://localhost:9000');

socket.on('connect', () => {
  console.log('Connected!')
  socket.emit('clientConnect');
})

socket.on('nsList',(nsData) => {
  console.log(nsData);
  const nameSpacesDiv = document.querySelector('.namespaces');
  nsData.forEach(ns => {
    // update the HTML each namespaces
    nameSpacesDiv.innerHTML += `<div class="namespace" ns="${ns.name}"><img src="${ns.image}"></div>`
  })
})
