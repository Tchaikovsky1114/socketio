// const username = prompt("put your name");
// const userPassword = prompt("put your password");

//Temp remove ...
const userName = "Rob";
const password = "1234"

const socket = io('http://localhost:9000');

socket.on('connect', () => {
  console.log('Connected!')
  socket.emit('clientConnect');
})

socket.on('nsList',(nsData) => {
  const lastNs = localStorage.getItem('lastNs');

  console.log(nsData);
  const nameSpacesDiv = document.querySelector('.namespaces');
  nameSpacesDiv.innerHTML = "";
  nsData.forEach(ns => {
    // update the HTML each namespaces
    nameSpacesDiv.innerHTML += `<div class="namespace" ns="${ns.endpoint}"><img src="${ns.image}"></div>`
  })

  Array.from(document.getElementsByClassName('namespace')).forEach(element => {
    element.addEventListener('click', e => {
      joinNs(element,nsData);
    })
  })

  // if lastNs is set, grab that element instead of 0
  joinNs(document.getElementsByClassName('namespace')[0], nsData);
})
