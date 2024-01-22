/**
 * @param {string | number} PORT The port to listen on.
 * @return {number} The normalized port number.
 */

module.exports.normalizePort = PORT => {
  if (isNaN(Number(PORT))) PORT = 8080

  return PORT
}

/**
 * @param {string} message The message to parse.
 * @return The parsed JSON object or null.
 */

module.exports.safeParseJSON = message => {
  try {
    return JSON.parse(message)
  } catch (error) {
    console.log('Parse Error: ' + error);
    return null
  }
}

/**
 * @typedef ErrorReason
 * @type {Object}
 * @param {string} reason - The reason for the error
 * @param {string} message - The error reason message
 * @param {any} data - The data received at the location of the error.
 * @param {string} location - The location of the error reason.
 */

/**
 * @typedef ErrorMessage
 * @type {Object}
 * @param {string} error - The error message.
 * @param {Array.<ErrorReason>} reasons - The reasons for the error.
 */

/**
 * @param {ErrorMessage}
 * @return The rendered error message
 */
module.exports.generateError = ({ error, reasons = [] }) => {
  return {
    type: 'error',
    message: error,
    code: error
      .split(' ')
      .join('_')
      .toLowerCase(),
    context_info: {
      errors: reasons.map(({ reason, message, data, location }) => {
        return {
          reason,
          message,
          data: data || null,
          location
        }
      })
    }
  }
}

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

module.exports.generateInstruction = ({ topic, targetID, sourceID, instruction = [] }) => {
  return {
      topic: topic,
      targetID: targetID,
      sourceID: sourceID, 
      instructions: instruction.map(({ targetType, command, auxilery }) => {
          return {
              targetType,
              command,
              auxilery
          }
      })
  }
}

/**
* @typedef InitHandshake
* @type {Object}
* @param {string} NestID - The Nest the in which the node has been initialized.
* @param {string} sourceID - the ID of the node sending the initiialization
* @param {string} targetID - used by independent nodes, wanting to set target
* @param {string} type - either dependent, independent, of sensor node
* @param {int} state - What was the state of the node for initiialization, null when sent back from server
*/

/**
* @param {InitHandshake}
* @return The rendered Initialization message sent to node on sucessfull initialization
*/

module.exports.InitHandshake = (({ NestID, sourceID, targetID, type, state}) => {
  return {
      NestID: NestID,
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


/*const handleTarget = (nodes, newNode, message) => {
  for (let node of nodes) {
      if (message.targetID == node.getID()) {
          newNode.setTarget(node);
      }
  }
}*/
