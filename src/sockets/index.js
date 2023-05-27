const WebSocket = require('ws')
const Topics = require('./topics')

const { normalizePort, safeParseJSON, generateError, generateInitialization, generateTargetSuccess } = require('../helpers');

const { IndependentNode, DependentNode } = require('./topics/node_declerations');

//stores connected socket nodes
//const connectedNodes = new Set();

const runSocketServer = (connectedNodes) => {

  const WSS = new WebSocket.Server({
    port: normalizePort(process.env.SOCKET_PORT || 8080)
  })

  WSS.on('listening', () => {
    console.log(
      `WebSocket Server is now listening on PORT: ${WSS.address().port}`
    )
  })

  WSS.on('connection', ws => {

    const start = Date.now(); //delete after done using to test

    ws.on('message', message => {
      const data = safeParseJSON(message)

    console.log(data);

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
      } else if (typeof data.topic === 'string' && Topics[data.topic]) {
        
        if(data.instructions == null) { // initializes node if the message isnt an instruction
          let newNode = null, isInit = false;
          if (data.type == "dependent") {
            newNode = new DependentNode(data.topic, data.sourceID, ws, data.state, data.type);
            isInit = true;
          } else if (data.type == "independent") {
            newNode = new IndependentNode(data.topic, data.sourceID, ws, data.state);

            for (let n of connectedNodes) { 
              if(data.targetID == n.getID()) {
                newNode.setTarget(n);
                console.log('target ID of %s set to : %s',data.sourceID, n.getID());

                ws.send(JSON.stringify( 
                  generateTargetSuccess({
                    topic: newNode.getTopic(),
                    sourceID: newNode.getID(),
                    targetID: newNode.getTarget()
                })))
              }
            }
            isInit = true;
          }

          ws.send(JSON.stringify(
            generateInitialization({ // for testing purposes
            topic: newNode.getTopic(),
            sourceID: newNode.getID(),
            targetID: newNode.getTarget(),
            type: data.type,
            state: newNode.getState()
          })))

          connectedNodes.add(newNode);
        }

        Topics[data.topic](WSS, ws, data, connectedNodes); // hand socket connection and data to desired topic

      } else {
        ws.send(
          JSON.stringify(
            generateError({
              error: 'Topic Not Found',
              reasons: [
                {
                  reason: 'invalid_topic',
                  message: 'Unable to find matching topic',
                  data: data.method,
                  location: 'topics'
                }
              ]
            })
          )
        )
      }
    });

    ws.on('close', message => {

      const end = Date.now(); //delete after done using to test

      console.log(`console close message: ${message}`);

      for (let n of connectedNodes) { 
        if(ws == n.getSocket()) {
          connectedNodes.delete(n);
          console.log(`${n.getID()} disconnected from the server`);
          console.log(`${n.getID()} disconnected after: ${end - start} milli-seconds`);
        }
      }
      console.log('New Connected Nodes: ');

      for(let node of connectedNodes)  {
        node.printNode();
      }

    });

  })

}

module.exports = {
  runSocketServer
}