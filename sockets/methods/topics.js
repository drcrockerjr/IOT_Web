module.exports = (wss, ws, message) => {
    ws.send(JSON.stringify({ topics: 'topics worked', received: message }))
  }