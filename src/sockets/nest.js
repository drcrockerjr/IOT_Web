const { Element, Controller } = require('./element.js')

class Nest {
    constructor(RoomID){
        this.RoomID = RoomID;
        this.elements = new Set();
    }

    getNestID = () => { return this.RoomID }

    connectElement = (e) => { 
        console.log('\n---- new %s element connected ------\n', this.RoomID);
        this.elements.add(h); 
    }
    //getElementById = (id) => {return this.elements. }
    getNumElements = () => { return this.elements.size(); }

    hasElementFromID = (id) => {
        for(let element of this.elements) {
            if(element.getSourceID() == id) {
                return true
            }
        }
        return false
    } 

    returnElementFromID = (id) => {
        for(let element of this.elements) {
            if(element.getSourceID() == id) {
                return element
            }
        }
        return null
    }
    printElements = () => {

        console.log('NestID: %s \n Elements:',  )
        for(let element of this.elements) {
            element.printElement();
        }
    }
}

routeIntructions = (message) => {

}

returnElementFromNests = (Nests, id) => {
    for(let nest of Nests) {
        if(nest.hasElementFromID(id)) {
            return nest.returnElementFromID(id)
        }
    }
    return null
}

addElementToNest = (Nests, element, id) => {


    let nestExists = false    
    let n = returnElementFromNests(Nests, id)

    for(let nest of Nests) {
        if(nest.getNestID() == element.getNestID()) {
            nest.addElementToNest(element)
            nestExists = true
        }
    }

    if(nestExists == false) {}
}

addElementToNest ((Nests, element, id) => {

})

module.exports = { Nest, routeIntructions, returnElementFromNests , addElementToNest};
