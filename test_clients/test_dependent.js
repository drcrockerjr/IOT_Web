

const { safeParseJSON } = require('../helpers');
const { generateInitialization } = require('../sockets/topics/socket_helpers')

let isInit = false;

const topic = "light";
const ID = "test_dependent";
const type = "dependent"
let state = 0;

var WebSocket = require('ws');
var stdin = process.openStdin();	// enable input from the keyboard
stdin.setEncoding('utf8');			  // encode everything typed as a string

var ws = new WebSocket('ws://localhost:8080/');

ws.on('open', function open() {
	// this function runs if there's input from the keyboard.
	// you need to hit enter to generate this event.

	ws.send(JSON.stringify(
		generateInitialization({
			topic: topic,
			sourceID: ID,
            targetID: null,
			type: type,
			state: state
		})
	))

	function sendMessage(data) {
		data = data.trim();
		ws.send(data);

		ws.send(stringify(
			
		))
	}
  stdin.on('data', sendMessage);
});

ws.on('error', function(error) {
	console.log(error);
});

ws.on('message', function(message, flags) {

	const data = safeParseJSON(message);

	if ( data.instructions != null) {
		console.log('%s said: %o', data.sourceID, data.instructions);	// print the message

		if( data["instructions"][0].command == 'change_state') {
			state = 1;
			console.log('state changed');
		}

	} else if (data.instructions == null){ //means it was an init
		console.log('Server said: %o',data );
	}

});