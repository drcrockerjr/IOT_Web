const WebSocket = require('ws')
const Topics = require('./topics')

const { normalizePort, safeParseJSON, generateError } = require('../helpers')

const connectedNodes = new Set();

const WSS = new WebSocket.Server({
  port: normalizePort(process.env.SOCKET_PORT || 8080)
})

WSS.on('listening', () => {
  console.log(
    `WebSocket Server is now listening on PORT: ${WSS.address().port}`
  )
})

WSS.on('connection', ws => {
  ws.on('message', message => {
    const data = safeParseJSON(message)

    if (data === null) {
      ws.send(
        JSON.stringify(
          generateError({
            error: 'Parse Error',
            reasons: [
              {
                reason: 'invalid_message_data',
                message: 'Unable to parse the message contents',
                data: message,
                location: 'websocket-message'
              }
            ]
          })
        )
      )
    } else if (typeof data.topic === 'string' && Topics[data.topic]) {
      Topics[data.topic](WSS, ws, data, connectedNodes)
    } else {
      ws.send(
        JSON.stringify(
          generateError({
            error: 'Topic Not Found',
            reasons: [
              {
                reason: 'invalid_topic',
                message: 'Unable to find matching topic',
                data: data.method,
                location: 'topics'
              }
            ]
          })
        )
      )
    }
  });

  /*WSS.on('close', () => {
    
  })*/

})
