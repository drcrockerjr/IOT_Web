
class Node {
    constructor(topic, id, sock, state) {
        this.topic = topic;
        this.id = id;
        this.socket = sock;
        this.state = state;
        this.targetNode = null;
    }

    getTopic() { return this.topic; }
    getID() { return this.id; }
    getSocket() { return this.socket; }
    getState() { return this.state; }
    getTarget() { return (this.targetNode != null) ? null : this.targetNode; }

    setTopic(topic) { this.topic = topic; }
    setID(id) { this.id = id; }
    setSocket(sock) { this.socket = sock; }
    setState(state) { this.state = state; }
    setTarget(node) { this.targetNode = node; }

}

class DependentNode extends Node {

    constructor(topic, id, sock, state) {
        super(topic, id, sock, state);

        this.type = "dependent";
    }
    
    getType() { return "dependent"; }

    handleCommand(command) {
        if(command == 'change-state') {
            this.changeState();
        } else {
            console.log(`${this.id} couldnt resolve command: ${command}`)
        }
    }

    changeState() {
        if(this.state == 0) {
            this.state = 1;
        } else {
            this.state = 0; 
        }
    }

    printNode() { 
       console.log('NodeID: %s, TargetID: %s, Type: %s, State: %i', 
        this.id, 
        ((this.targetNode != null) ? this.targetNode.getID() : null), 
        this.type, 
        this.state);

    }

}

class IndependentNode extends Node {

    constructor(topic, id, sock, state) {
        super(topic, id, sock, state);
        
        this.type = "dependent";
        this.targetNode = null;
    }

    getType() { return "independent"; }

    changeState() {
        if(this.state == 0) {
            this.state = 1;
        } else {
            this.state = 0; 
        }
    }

    printNode() { 
        console.log('NodeID: %s, TargetID: %s, Type: %s, State: %i',
        this.id, 
        ((this.targetNode != null) ? this.targetNode.getID() : null), 
        this.type,
        this.state);
    }
}

module.exports = { IndependentNode, DependentNode };