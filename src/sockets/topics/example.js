module.exports = (wss, ws, message, connectedNodes) => {
  ws.send(JSON.stringify({ hello: 'world', received: message }))
}
