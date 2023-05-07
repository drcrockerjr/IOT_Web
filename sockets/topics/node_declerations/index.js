
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

    getType() { return "independent"; }

    changeState() {
        if(this.state == 0) {
            this.state = 1;
        } else {
            this.state = 0; 
        }
    }
}

module.exports = { IndependentNode, DependentNode };