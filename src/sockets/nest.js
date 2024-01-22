/**
 * ${1:Description placeholder}
 * @date 1/1/2024 - 11:08:33 PM
 *
 * @type {*}
 */
const { Element, Controller } = require('./element.js')

class Nest {
    /**
 * Creates an instance of Nest.
 * @date 1/1/2024 - 11:08:33 PM
 *
 * @constructor
 * @param {*} RoomID
 */
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

/**
 * ${1:Description placeholder}
 * @date 1/1/2024 - 11:08:33 PM
 **/

printElements = () => {

        console.log('NestID: %s \n Elements:',  )
        for(let element of this.elements) {
            element.printElement();
        }
    }
}

routeIntructions = (message) => {

}

/**
 * Returns and element object based on id from nests provided.
 * 
 * @param {Nest[]} Nests - An array of Nest objects.
 * @param {string} id - The element to be added to a nest.
 * @return {Element} - The located element object or null if not found
 **/

returnElementFromNests = (Nests, id) => {
    for(let nest of Nests) {
        if(nest.hasElementFromID(id)) {
            return nest.returnElementFromID(id)
        }
    }
    return null
}

/**
 * Adds an element to the specified nest.
 * 
 * @param {Nest[]} Nests - An array of Nest objects.
 * @param {Element} element - The element to be added to a nest.
 **/

addElementToNests = (Nests, element) => {

    let nestExists = false    
    let n = returnElementFromNests(Nests, id)
    let newNest;

    for(let nest of Nests) {
        if(nest.getNestID() == element.getNestID()) {
            nest.addElementToNest(element)
            nestExists = true
        }
    }

    if(nestExists == false) {
        newNest = new Nest(element.getNestID())
        Nests.add(newNest)
    }
}

module.exports = { 
    Nest, 
    routeIntructions, 
    returnElementFromNests, 
    addElementToNests };
