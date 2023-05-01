
const Node = (ID, socket) => {
    let topic = null;


    const getID = () => ID;
    const getSocket = () => socket;

    const setTopic = (inTopic) => { topic = inTopic };

    return {
        getID,
        getSocket,
        setTopic,
    }

}

const Light = (ID, socket, state) => {

    const lightNode = Node(ID, socket);

    const changeState = () => {
        if(state == 0) {
            state = 1;
        } else {
            state = 0
        }
    }
    
    return {
        lightNode,
        changeState,
        setTopic
    }

}

const light = Light(1, ws)

light.lightNode.setTopic("light")

light.lightNode.getID


module.exports = { Node, Light };