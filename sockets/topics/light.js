module.exports = (wss, ws, message, connectedNodes) => {
    ws.send(JSON.stringify({ topics: 'topics worked', received: message }))
  }