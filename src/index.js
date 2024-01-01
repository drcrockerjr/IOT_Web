const {runSocketServer} = require('./sockets');
const {runWebServer} = require('./web');

Nests = new Set();

runSocketServer(Nests);
runWebServer(Nests);

