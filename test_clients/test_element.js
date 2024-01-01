

const { safeParseJSON, InitHandshake } = require('../src/instructions');
const io = require('socket.io-client');


let isInit = false;

const NestID = "light";
const ID = "test_dependent";
const type = "dependent"
let state = 0;

var stdin = process.openStdin();	// enable input from the keyboard
stdin.setEncoding('utf8');			  // encode everything typed as a string

const socket = io("ws://localhost:8080/");

socket.on('connect', function open() {
	// this function runs if there's input from the keyboard.
	// you need to hit enter to generate this event.

	socket.send(JSON.stringify(
		InitHandshake({
			NestID: NestID,
			sourceID: ID,
            targetID: null,
			type: type,
			state: state
		})
	))

	const sendMessage = (data) => {
		data = data.trim();
		socket.send(data);

		socket.send(stringify(
			
		))
	}
  stdin.on('data', sendMessage);
});

socket.on('error', (error) => {
	console.log(error);
});

socket.on('data', (message) => {

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