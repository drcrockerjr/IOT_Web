const { Switch, Node, Light  } = require('./node_declerations/node.js');

const { generateInstruction } = require('./socket_helpers/index.js')

var counter

const connectedLightNodes = new Set()

module.exports = (wss, ws, data) => {

    if ( data.instruction == null) { // if data.instruction is null, it is a initiaization message
      
    }

    if ( data.node = 'switch') {
      const newSwitch = new Switch((connectedLightNodes.size + 1), ws, data.state);

      connectedLightNodes.push(newSwitch);
    }

    ws.send(JSON.stringify({ 
      topics: 'topics worked', 
      received: message, 
      nodeAdded: ''
    }));
  }