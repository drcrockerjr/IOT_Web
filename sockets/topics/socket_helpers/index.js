/**
 * @typedef Instruction
 * @type {Object}
 * @param {string} targetType - The the type of node the command is targeting, will be used when sensors are added
 * @param {string} command - The command = [changeState, will add more]
 * @param {any} auxilery - Auxilery data that accompanies the command
 */

/**
 * @typedef InstructionMessage
 * @type {Object}
 * @param {string} topic - The topic the Instruction was sent from.
 * @param {string} targetID - The ID of the node intruction is targeting
 * @param {string} sourceID - the ID of the node sending command
 * @param {Array.<Instruction>} instruction - The reasons for the error.
 */

/**
 * @param {InstructionMessage}
 * @return The rendered Instruction message to be sent
 */

const generateInstruction = ({ topic, targetID, sourceID, instruction = [] }) => {
    return {
        topic: topic,
        targetID: targetID,
        sourceID: sourceID, 
        instructions: instruction.map(({ targetID, targetType, command, auxilery }) => {
            return {
                targetType,
                command,
                auxilery
            }
        })
    }
}

/**
 * @typedef InitializeMessage
 * @type {Object}
 * @param {string} topic - The topic the in which the node has been initialized.
 * @param {string} sourceID - the ID of the node sending the initiialization
 * @param {string} targetID - used by independent nodes, wanting to set target
 * @param {string} type - either dependent, independent, of sensor node
 * @param {int} state - What was the state of the node for initiialization, null when sent back from server
 */

/**
 * @param {InitializeMessage}
 * @return The rendered Initialization message sent to node on sucessfull initialization
 */

const generateInitialization = (({ topic, sourceID, targetID, type, state}) => {
    return {
        topic: topic,
        sourceID: sourceID,
        targetID: targetID || null,
        type: type,
        state: state
    }
})

/**
 * @typedef TargetSuccessMessage
 * @type {Object}
 * @param {string} topic - The topic the in which the node has been initialized.
 * @param {string} sourceID - the ID of the independent node that was set as target
 * @param {string} targetID - the id of the target node that this is being sent to
 */

/**
 * @param {TargetSuccessMessage}
 * @return The rendered Initialization message sent to node on sucessfull dendependent and independant node linkage. Is sent by the Independent node or controller.
 */

const generateTargetSuccess = (({ topic, sourceID, targetID}) => {
    return {
        topic: topic,
        sourceID: sourceID,
        targetID: targetID,
    }
})


/*const handleTarget = (nodes, newNode, message) => {
    for (let node of nodes) {
        if (message.targetID == node.getID()) {
            newNode.setTarget(node);
        }
    }
}*/


module.exports = { 
    generateInstruction, 
    generateInitialization, 
    generateTargetSuccess, 
}