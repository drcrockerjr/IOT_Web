/**
 * @typedef Instruction
 * @type {Object}
 * @param {string} type - The the type of node the command is targeting
 * @param {string} command - The command = [changeState, will add more]
 * @param {any} data - Auxilery data that accompanies the command
 * @param {string} location - The location of the error reason.
 */

/**
 * @typedef InstructionMessage
 * @type {Object}
 * @param {string} topic - The topic the Instruction was sent from.
 * @param {string} targetID - the ID of the target node
 * @param {Array.<Instruction>} instructions - The reasons for the error.
 */

/**
 * @param {InstructionMessage}
 * @return The rendered Instruction message to be sent
 */

module.exports.generateInstruction = ({ topic, targetID, instructions = [] }) => {
    return {
        topic: topic,
        targetID: targetID, 
        instruction: instructions.map(({ type, command, data, location}) => {
        return {
            type,
            command,
            data: data || null,
            loacation: location || null
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

module.exports.generateInitialization = (({ topic, sourceID, targetID, type, state}) => {
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

module.exports.generateTargetSuccess = (({ topic, sourceID, targetID}) => {
    return {
        topic: topic,
        sourceID: sourceID,
        targetID: targetID,
    }
})

