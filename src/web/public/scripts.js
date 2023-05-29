const ID = 'test_web_independent';
const target = 'test_dependent';
const type = 'independent';

var state = 0;

var btn;
var topic_txt;
var socket;
var socketStatus;
var listMsgs;

var init = {
	topic: 'light',
	sourceID: ID,
	targetID: target,
	type: type,
	state: state

}

var instruction = {
	topic: 'light',
	targetID: target,
	sourceID: ID,
	instructions: [
	  {
		targetType: 'dependent',
		command: 'change_state',
		auxilery: 'null'
	  }
	]
}

window.onload = function() {
	btn = document.getElementById('change-state');
	topic_txt = document.getElementById('topic-text');
	socketStatus = document.getElementById('status');
	listMsgs = document.getElementById('messages');




	socket = new WebSocket('ws://192.168.10.50:8080/');

	btn.addEventListener("click", changeState);


	socket.onopen = function(event) {
		socketStatus.innerHTML = 'Connected to: ' + event.currentTarget.URL;
		socketStatus.className = 'open';
	
		init.topic = topic_txt.value;

		console.log(init); // testing
	
		socket.send(JSON.stringify(init));

	};
	
	socket.onerror = function(error) {
		console.log('Websocket error: ' + error);
	}

	socket.onclose = function(event) {
		socketStatus.innerHTML = 'Disconnected from the WebSocket.';
		socketStatus.className = 'closed';
	};

	socket.onmessage = function(event) {
		var msg = event.data;
		listMsgs.innerHTML += '<li class="received"><span>Received:</span>' + msg + '</li>';
	};

}


function changeState() {

	socket.send(JSON.stringify(instruction));

	socket.close();

}	

