const Namespace = require('../classes/Namespace');
const Room = require('../classes/Room');

// id name image, endpoint
const wikiNs = new Namespace(
  0,
  'Wikipedia',
  'https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/103px-Wikipedia-logo-v2.svg.png',
  '/wiki'
);

wikiNs.addRoom(new Room(0,'New Articles',0))
wikiNs.addRoom(new Room(1,'Editors',0))
wikiNs.addRoom(new Room(2,'Other',0))

const mozNs = new Namespace(
  1,
  'Mozilla',
  'https://www.mozilla.org/media/img/logos/firefox/logo-quantum.9c5e96634f92.png',
  '/mozilla'
)

mozNs.addRoom(new Room(0,'Firefox',0))
mozNs.addRoom(new Room(1,'SeaMonkey',0))
mozNs.addRoom(new Room(2,'SpiderMonkey',0))
mozNs.addRoom(new Room(3,'Rust',0))



const linuxNs = new Namespace(
  2,
  'Linux',
  'https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png',
  '/linux'
)


linuxNs.addRoom(new Room(0,'Debian',0))
linuxNs.addRoom(new Room(1,'Red Hat',0))
linuxNs.addRoom(new Room(2,'Ubuntu',0))
linuxNs.addRoom(new Room(3,'Mac OS',0))


const namespaces = [wikiNs, mozNs, linuxNs];

module.exports = namespaces;
