
class Node {
    constructor(topic, id, sock, state) {
        this.topic = topic;
        this.id = id;
        this.socket = sock;
        this.state = state;
    }

    getTopic() { return this.topic; }
    getID() { return this.id; }
    getSocket() { return this.socket; }
    getState() { return this.state; }
    getTarget() { return this.targetNode; }

    setTopic(topic) { this.topic = topic; }
    setID(id) { this.id = id; }
    setSocket(sock) { this.socket = sock; }
    setState(state) { this.state = state; }
    setTarget(node) { this.targetNode = node; }
}

class DependentNode extends Node {
    /*constuctor(topic, id, sock, state) {
        super(topic, id, sock, state);
    }*/

    getType() { return "dependent"; }

    changeState() {
        if(this.state == 0) {
            this.state = 1;
        } else {
            this.state = 0; 
        }
    }

}

class IndependentNode extends Node {
    /*constuctor(topic, id, sock, state) {
        super(topic, id, sock, state);
    }*/


    getType() { return "independent"; }

    changeState() {
        if(this.state == 0) {
            this.state = 1;
        } else {
            this.state = 0; 
        }
    }
}

/*
const DependentNode = (topic, ID, socket, state) => {

    let sourceNode;

    const getID = () => ID;
    const getSocket = () => socket;
    const getType = () => type;

    const setTopic = (inTopic) => { topic = inTopic };

    const changeState = () => {
        if(state == 0) {
            state = 1;
        } else {
            state = 0;
        }
    }

    return {
        getID,
        getSocket,
        getType,
        setTopic,
        changeState
    }

}*/


/*
const IndependentNode = (topic, ID, socket, state) => {

    let targetNode = null;

    const setTarget = (target) => {
        let targetSet = false;
         
        if(targetNode = target) {
            targetSet = true;
        }
        /*socket.send( stringify({
            type: "${targetNode.getType}",
            command: "message",
            message: "Independent Set"
        }));

        return targetSet;


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
        setTarget,
        setSocket,
        changeState,
    }

} */


module.exports = { IndependentNode, DependentNode };