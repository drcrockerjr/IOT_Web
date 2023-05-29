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

	btnConnect = document.getElementById('connect');
	btnChange = document.getElementById('change-state');
	btnClose = document.getElementById('close-socket');


	topic_txt = document.getElementById('topic-text');
	target_txt = document.getElementById('target-text');

	socketStatus = document.getElementById('status');
	listMsgs = document.getElementById('messages');



	btnConnect.addEventListener("click", connectSocket);

	btn.addEventListener("click", changeState);

	btnClose.addEventListener("click", closeSocket);



}

function connectSocket() {

	socket = new WebSocket('ws://192.168.10.50:8080/');

	socket.onopen = function(event) {
		socketStatus.innerHTML = 'Connected to: ' + event.currentTarget.URL;
		socketStatus.className = 'open';
	
		init.topic = topic_txt.value;
		init.targetID = target_text.value;

		console.log(init); // testing
	
		socket.send(JSON.stringify(init));

	};
	
	socket.onerror = function(error) {
		console.log('Websocket error: ' + error);
	}

	socket.onclose = function(event) {
		socketStatus.innerHTML = 'Disconnected from the WebSocket.';

		socketStatus.innerHTML = 'Disconnected from: ' + event.currentTarget.URL;
		socketStatus.className = 'closed';
	};

	socket.onmessage = function(event) {
		var msg = event.data;
		listMsgs.innerHTML += '<li class="received"><span>Received:</span>' + msg + '</li>';
	};

}

function changeState() {

	instruction.targetID = target_text.value;

	socket.send(JSON.stringify(instruction));

}	

function closeSocket() {

	socket.close();

}

