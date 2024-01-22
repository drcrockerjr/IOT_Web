//const WebSocket = require('ws')
//const NestIDs = require('./NestIDs')
const { Server } = require("socket.io");
const io = new Server(8080);


const { Nest, routeIntructions, returnElementFromNests, addElementToNests } = require('./nest.js');

const { safeParseJSON, generateError, InitHandshake, generateTargetSuccess } = require('../instructions.js');

const { Element, Controller } = require('./element.js');

//stores connected socket nodes
//const connectedNodes = new Set();

/*
var cron = require('node-cron');
  
cron.schedule('* * * * *', () => {
  console.log('running a task every minute');
});
\
use for ping/pong frame on a timer to check when connections close out or not

*/

const runSocketServer = (Nests) => {

  console.log(`Socket.IO server running on port ${io.httpServer.address().port}`);

  io.on('connection', (socket) => {

    const start = Date.now(); //delete after done using to test



    socket.on('message', message => {
      const data = safeParseJSON(message)

      console.log('\nData Recieved: \n %o', data);

      if (data === null) {
        ws.send(
          JSON.stringify(
            generateError({
              error: 'Parse Error',
              reasons: [
                {
                  reason: 'invalid_message_data',
                  message: 'Unable to parse the message contents',
                  data: message,
                  location: 'websocket-message'
                }
              ]
            })
          )
        )
      } else if (typeof data.NestID === 'string') {
        
        if(data.instructions == null) { // initializes element if the message isnt an instruction
          let newElement = null, isInit = false; 
          if (data.targetID == null) { // Element and not a controller
            newElement = new Element(data.NestID, data.sourceID, socket, data.state);
            isInit = true;
          } else { // Element should be a controller if there is a element targetID

            //Controller element created and target is set
            newElement = new Controller(data.NestID, data.sourceID, socket, data.state);
            if(returnElementFromNests(Nests, data.targetID) != null) {
              newElement.setTarget(returnElementFromNests(Nests, data.targetID))

              ws.send(JSON.stringify( 
                generateTargetSuccess({
                  NestID: newElement.getNestID(),
                  sourceID: newElement.getID(),
                  targetID: newElement.getTarget()
              })))

              isInit = true
            } else { // target not found
              console.log('\nTarget doesnt exist')
            }
            
            /*for (let n of Nests) { 
              if(data.targetID == e.getSourceID()) {
                newElement.setTarget(e);
                console.log('\ntarget ID of %s set to : %s',newElement.getID(), newElement);
		            console.log(`\nTarget ID of ${newElement.getID()} set to => ${newElement.getTarget().getID()}`);

                ws.send(JSON.stringify( 
                  generateTargetSuccess({
                    NestID: newElement.getNestID(),
                    sourceID: newElement.getID(),
                    targetID: newElement.getTarget()
                })))
              }
            
            isInit = true;
            }*/

          }

          socket.send(JSON.stringify(
            generateInitialization({ // for testing purposes
            NestID: newElement.getNestID(),
            sourceID: newElement.getID(),
            targetID: newElement.getTarget(),
            type: data.type,
            state: newElement.getState()
          })))

          connectedNodes.add(newElement);

          addElementToNests( Nests, newElement, newElement)


        } else if(data.instructions != null) {
          // data needs to be routed
        }

        //NestIDs[data.NestID](WSS, socket, data, connectedNodes); // hand socket connection and data to desired NestID

      } else {
        socket.send(
          JSON.stringify(
            generateError({
              error: 'NestID Not Found',
              reasons: [
                {
                  reason: 'invalid_NestID',
                  message: 'Unable to find matching NestID',
                  data: data.method,
                  location: 'NestIDs'
                }
              ]
            })
          )
        )
      }
    });

    socket.on('close', message => {

      const end = Date.now(); //delete after done using to test

      console.log(`console close message: ${message}`);

      for (let n of connectedNodes) { 
        if(ws == n.getSocket()) {
          connectedNodes.delete(n);


    	  console.log(`\n---- ${n.getID()} node disconnected ------\n`);

          console.log(`${n.getID()} disconnected after: ${end - start} milli-seconds\n`);
    	  
	  //logs to console the connected nodes
    	  console.log('Connected Nodes: ');

    	  for(let node of connectedNodes)  {
      	    node.printNode();
    	  }
	  
    	  console.log('\n');
        }
      }
    });

  })

}

module.exports = {
  runSocketServer
}
