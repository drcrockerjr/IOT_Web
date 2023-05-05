const { IndependentNode, DependentNode } = require('./node_declerations/index.js');

const { generateInstruction, generateInitialization, generateTargetSuccess, handleTarget } = require('./socket_helpers/index.js')

const connectedLightNodes = new Set()

module.exports = (wss, ws, data) => {

    if ( data.instruction == null) { // if data.instruction is null, it is a initiaization message

      let newNode = null, isInit = false;
      if (data.type == "dependent") {
        newNode = new DependentNode(data.topic, data.sourceID, ws, data.state);
        isInit = true;
      } else if (data.type == "independent") {
        newNode = new IndependentNode(data.topic, data.sourceID, ws, data.state);

        handleTarget(connectedLightNodes, newNode, data);

        isInit = true;
      }


      ws.send(JSON.stringify(generateInitialization({
        topic: newNode.getTopic(),
        sourceID: newNode.getID(),
        type: data.type,
        state: newNode.getState()
      })))

      connectedLightNodes.add(newNode);

      console.log('---- new light node connected ------');
      //logs to console the connected nodes
      console.log('Connected Nodes: ');

      for(let node of connectedLightNodes)  {
        console.log('NodeID: %s, TargetID: %s, Type: %s, State: %i',node.getID(), node.getTarget(), node.getType() ,node.getState());
      }
    }



  }