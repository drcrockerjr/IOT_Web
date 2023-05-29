const { IndependentNode, DependentNode } = require('./node_declerations');

const{ generateError } = require('../../helpers');

module.exports = (wss, ws, data, connectedNodes) => { // this blcok is for new nodes being that are initializing their first connection

  if ( data.instructions == null) { // if data.instruction is null, it is a initiaization message


    console.log('\n---- new light node connected ------\n');
    //logs to console the connected nodes
    console.log('Connected Nodes: ');

    for(let node of connectedNodes)  {
      node.printNode();
    }
	  
    console.log('\n');

  } else if (data.instructions != null) {

    //finds desired target node [ need to make its own function ]
    for (let n of connectedNodes) { 
      if(data.targetID == n.getID()) {

          console.log('data routed:  %s ===> %s', data.sourceID, data.targetID);

          const targetSock = n.getSocket()
          targetSock.send(JSON.stringify(data.instructions));
      }
    }

  } else {
    //send error message
    ws.send(
      JSON.stringify(
        generateError({
          error: 'Unknown Message Type',
          reasons: [
            {
              reason: 'invalid_message',
              message: 'Unable to handle message',
              data: data.method,
              location: 'light.js'
            }
          ]
        })
      )
    )
  }
}
