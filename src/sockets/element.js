
class Element {
    constructor(NestID, socketID, sock, state) {
        this.NestID = NestID;
        this.sourceID = sourceID;
        this.socket = sock;
        this.socketID = sock.id;
        this.state = state;
        this.targetID = null;
    }

    getNestID() { return this.NestID; }
    getSourceID() { return this.sourceID; }
    getSocket() { return this.socket; }
    getSocketID() { return this.socket.id; }
    getState() { return this.state; }
    getTarget() { return (this.targetID == null) ? null : this.targetID; }

    setNestID(NestID) { this.NestID = NestID; }
    setSourceID(id) { this.sourceID = id; }
    setSocket(sock) { 
        this.socket = sock; 
        this.socketID = this.socket.id;
    }
    setState(state) { this.state = state; }
    setTarget(node) { this.targetID = node; }


    printElement() { 
        console.log('NestID: %s, SourceID: %s, Type: %s, State: %i \n',
        this.id, 
        (this.targetID == null) ? null : this.targetID.getID(), 
        this.type,
        this.state);
    }

}

class Controller extends Element {

    constructor(NestID, socketID, sock, state, targetID) {
        super(NestID, socketID, sock, state);

        this.targetID = targetID;
    }

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

}

module.exports = { Element, Controller };

