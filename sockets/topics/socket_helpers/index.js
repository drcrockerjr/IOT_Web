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
 * @param {string} targetID - the ID of the target node
 * @param {string} type - either dependent, independent, of sensor node
 * @param {boolean} isSuccess - Was the intiialization a success.
 */

/**
 * @param {InitializeMessage}
 * @return The rendered Initialization message sent to node on sucessfull initialization
 */

module.exports.generateInitialization = (({ topic, targetID, isSuccess}) => {
    return {
        topic: topic,
        targetID: targetID,
        type: type,
        isSuccess: isSuccess
    }
})

