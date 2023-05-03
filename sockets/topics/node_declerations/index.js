
const DependentNode = (ID, socket, type) => {
    let topic;
    let state = null;


    const getID = () => ID;
    const getSocket = () => socket;
    const getType = () => type;

    const setTopic = (inTopic) => { topic = inTopic };

    const changeState = () => {
        if(state == 0) {
            state = 1;
            socket.send(
                JSON.stringify({
                    topic: "light",
                    state: "${state}"
                    })
            );
        } else {
            state = 0;
            socket.send(
                JSON.stringify({
                    topic: "light",
                    state: "${state}"
                    })
            );
        }

    }

    return {
        getID,
        getSocket,
        getType,
        setTopic,
        changeState
    }

}

/*const Light = (ID, socket, state) => {

    const lightNode = Node(ID, socket);

    const changeState = () => {
        if(state == 0) {
            state = 1;
            socket.send(
                JSON.stringify({
                    topic: "light",
                    state: "${state}"
                    })
            );
        } else {
            state = 0;
            socket.send(
                JSON.stringify({
                    topic: "light",
                    state: "${state}"
                    })
            );
        }

    }

    return {
        lightNode,
        changeState,
        setTopic
    }

} 
*/

const IndependentNode = (ID, socket, type) => {

    let ID, socket, type, state, topic, targetNode;
    
    //const SwitchNode = Node(ID, socket);

    const init = (id, sock, in_state, in_topic) => {
        ID = id;
        socket = sock;
        state = in_state;
        topic = in_topic;
    }

    const setTarget = (target) => { 
        targetNode = target;
        socket.send( stringify({
            type: "${targetNode.getType}",
            command: "message",
            message: "Independent Set"
        }));
    }

    const setSocket = (sock) => { socket = sock }

    const changeState = () => {
        if(state == 0) {
            state = 1;
            targetSocket.send(
                JSON.stringify({
                    command: "change_state",
                    state: "${state}"
                    })
            );
        } else {
            state = 0;
            targetSocket.send(
                JSON.stringify({
                    command: "change_state",
                    state: "${state}"
                    })
            );
        }

    }
    
    return {
        init,
        setTarget,
        setSocket,
        changeState,
    }

} 


module.exports = { IndependentNode, DependentNode };