var Websocket = require('ws');

const topic = 'light';
const ID = 'test_web_independent';
const target = 'test_dependent';
const type = 'independent';
let state = 0;


const changeState = () => {
    var ws = new Websocket('ws://localhost:8080/');

	ws.on('open', function open() {
		// this function runs if there's input from the keyboard.
		// you need to hit enter to generate this event.
	
		ws.send(JSON.stringify(
			generateInitialization({
				topic: topic,
				sourceID: ID,
				targetID: target,
				type: type,
				state: state
			})
		));
	
	});

    //maybe add target initiailization confirmation from server

    //Send test message
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
	);

    ws.close();

}