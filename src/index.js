const {runSocketServer} = require('./sockets');
const {runWebServer} = require('./web');

connectedNodes = new Set();

runSocketServer(connectedNodes);
runWebServer(connectedNodes);

