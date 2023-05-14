

const { safeParseJSON, generateInstruction, generateInitialization } = require('../helpers');

let isInit = false;

const topic = 'light';
const ID = 'test_independent';
const target = 'test_dependent';
const type = 'independent';
let state = 0;

var WebSocket = require('ws');
var stdin = process.openStdin();	// enable input from the keyboard
stdin.setEncoding('utf8');			  // encode everything typed as a string

var ws = new WebSocket('ws://localhost:8080/');

ws.on('open', function open() {

	ws.send(JSON.stringify(
		generateInitialization({
			topic: topic,
			sourceID: ID,
            targetID: target,
			type: type,
			state: state
		})
	));

  stdin.on('data', sendMessage);
});

ws.on('error', function(error) {

	console.log(error);

});

ws.on('message', function(data, flags) {

	const message = safeParseJSON(data);

	console.log('Server said: %o', message);	// print the message

});

function sendMessage(data) {

	ws.send(
		JSON.stringify(
			generateInstruction({
				topic: topic,
				targetID: 'test_dependent', 
				sourceID: ID,
				instruction: [
					{
						targetType: 'dependent',
						command: 'change_state',
						auxilery: 'null'
					}
				]
			})
		)
	)
}