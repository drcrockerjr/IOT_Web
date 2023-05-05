

const { generateInstruction, generateInitialization } = require('../sockets/topics/socket_helpers')

let isInit = false;

var WebSocket = require('ws');
var stdin = process.openStdin();	// enable input from the keyboard
stdin.setEncoding('utf8');			  // encode everything typed as a string

var ws = new WebSocket('ws://localhost:8080/');

ws.on('open', function open() {
	// this function runs if there's input from the keyboard.
	// you need to hit enter to generate this event.

	ws.send(JSON.stringify(
		generateInitialization({
			topic: "light",
			sourceID: "test_dependent",
            targetID: null,
			type: "dependent",
			state: 0
		})
	))

	function sendMessage(data) {
		data = data.trim();
		ws.send(data);

		ws.send(stringify({

		}))
	}
  stdin.on('data', sendMessage);
});

ws.on('error', function(error) {
	console.log(error);
});

ws.on('message', function(data, flags) {

	console.log('Server said: ' + data);	// print the message
});