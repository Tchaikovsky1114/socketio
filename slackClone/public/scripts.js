// const username = prompt("put your name");
// const userPassword = prompt("put your password");

//Temp remove ...
const userName = "Rob";
const password = "1234"

const clientOptions = {
  query: {
    jwt: '1234'
  },
  auth: {
    userName,password
  }
}

// always join the main namespace, because that's where the client get's the other namespace from
const socket = io('http://localhost:9000',clientOptions);


const nameSpaceSockets = [];


const listeners = {
  nsChange: [],
  messageToRoom: [],
}

// a global variable we can update when the user clicks on a namespace
// we will use it to broadcast across the app (redux would be great here...)
let selectedNsId = 0;

  // add a submit handler for out form
  document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault();
    //grab the value from the input box
    const newMessage = document.querySelector('#user-message').value

    nameSpaceSockets[selectedNsId].emit('newMessageToRoom',{
      newMessage,
      date: Date.now(),
      avatar: 'https://via.placeholder.com/30',
      userName,
      selectedNsId,
    })
    document.querySelector('#user-message').value = '';
  })

  
  // addListener is to manage all listeners added to all namespaces.
  // this prevents listeners being added multiple time.
const addListener = (nsId) => {

  if(!listeners.nsChange[nsId]) {
    nameSpaceSockets[nsId].on('nsChange',(data) => {
      console.log('Namespace Changed');
      console.log(data);
    })
    listeners.nsChange[nsId] = true;
  }

  if(!listeners.messageToRoom[nsId]) {
    // add the nsId listener to this namespace
    nameSpaceSockets[nsId].on('messageToRoom',messageObj => {
      console.log(messageObj);
      document.querySelector('#messages').innerHTML += buildMessageHtml(messageObj);
    })
    listeners.messageToRoom[nsId] = true;
  }
}    

socket.on('connect', () => {
  console.log('Connected!')
  socket.emit('clientConnect');
})



socket.on('nsList',(nsData) => {
  const lastNs = localStorage.getItem('lastNs');

  const nameSpacesDiv = document.querySelector('.namespaces');
  nameSpacesDiv.innerHTML = "";
  
  nsData.forEach(ns => {
    // update the HTML each namespaces
    nameSpacesDiv.innerHTML += `<div class="namespace" ns="${ns.endpoint}"><img src="${ns.image}"></div>`

    // if the connection is new, this will be null
    // if the connection has already been extablished, it will reconnect and remain in its spot
    if(!nameSpaceSockets[ns.id]) {
      // There is no socket at this nsId. so make a new connection.
      // join this namespace with io()
      nameSpaceSockets[ns.id] = io(`http://localhost:9000${ns.endpoint}`);
    }
    addListener(ns.id);
  })

  Array.from(document.getElementsByClassName('namespace')).forEach(element => {
    element.addEventListener('click', e => {
      joinNs(element,nsData);
    })
  })

  // if lastNs is set, grab that element instead of 0
  joinNs(document.getElementsByClassName('namespace')[0], nsData);
})


