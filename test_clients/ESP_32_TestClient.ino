 /*
	Esp32 Websockets Client

	This sketch:
        1. Connects to a WiFi network
        2. Connects to a Websockets server
        3. Sends the websockets server a message ("Hello Server")
        4. Prints all incoming messages while the connection is open

	Hardware:
        For this sketch you only need an ESP32 board.

	Created 15/02/2019
	By Gil Maimon
	https://github.com/gilmaimon/ArduinoWebsockets

*/

#include <ArduinoJson.h>
#include <Arduino.h>

#include <WiFi.h>
#include <WiFiMulti.h>
#include <WiFiClientSecure.h>

#include <WebSocketsClient.h>

const char* ssid = "2.4 875 NW Calliope Unit 104"; //Enter SSID
const char* password = "CXNK00597744"; //Enter Password
const char* websockets_server_host = "192.168.10.50"; //Enter server adress
const uint16_t websockets_server_port = 8080; // Enter server port

const int pin_1 = 4;
const int pin_2 = 16;

DynamicJsonDocument doc(2048);

void handleInstruction() {

}


/*char**  getInstruction(String payload) {

  const char* data = payload.c_str();

  deserializeJson(doc, data);
  /*if(error) {
    Serial.print(F("deserializeJson() failed: "));
    Serial.println(error.c_str());
    return NULL;
  }

  const String source_id = doc["sourceID"];

  const char** instruction = doc["instructions"];

  Serial.print(F("Instrucitons: "));
  Serial.printf("targetType: %s, command: %s, pin: %s \n ", instruction[0], instruction[1], instruction[2]);

  return instruction;
}*/

WiFiMulti WiFiMulti;
WebSocketsClient webSocket;

#define USE_SERIAL Serial1

const char* json = "{\"topic\":\"topic\",\"sourceID\":\"sourceID\",\"targetID\":"NULL",\"type\":\"type\",\"state\":\"state\"}";

/*
JsonObject& root = jsonBuffer.parseObject(json);

const char* topic = root["topic"]; // "topic"
const char* sourceID = root["sourceID"]; // "sourceID"
const char* type = root["type"]; // "type"
const char* state = root["state"]; // "state"
*/




void hexdump(const void *mem, uint32_t len, uint8_t cols = 16) {
	const uint8_t* src = (const uint8_t*) mem;
	USE_SERIAL.printf("\n[HEXDUMP] Address: 0x%08X len: 0x%X (%d)", (ptrdiff_t)src, len, len);
	for(uint32_t i = 0; i < len; i++) {
		if(i % cols == 0) {
			USE_SERIAL.printf("\n[0x%08X] 0x%08X: ", (ptrdiff_t)src, i);
		}
		USE_SERIAL.printf("%02X ", *src);
		src++;
	}
	USE_SERIAL.printf("\n");
}

void webSocketEvent(WStype_t type, uint8_t * payload, size_t length) {

	switch(type) {
		case WStype_DISCONNECTED:
			USE_SERIAL.printf("[WSc] Disconnected!\n");
			break;
		case WStype_CONNECTED:
			USE_SERIAL.printf("[WSc] Connected to url: %s\n", payload);

			// send message to server when Connected
			webSocket.sendTXT("Connected");
			break;
		case WStype_TEXT:
			USE_SERIAL.printf("[WSc] get text: %s\n", payload);

			// send message to server
			// webSocket.sendTXT("message here");
			break;
		case WStype_BIN:
			USE_SERIAL.printf("[WSc] get binary length: %u\n", length);
			hexdump(payload, length);

			// send data to server
			// webSocket.sendBIN(payload, length);
			break;
		case WStype_ERROR:			
		case WStype_FRAGMENT_TEXT_START:
		case WStype_FRAGMENT_BIN_START:
		case WStype_FRAGMENT:
		case WStype_FRAGMENT_FIN:
			break;
	}

}

void setup() {
	// USE_SERIAL.begin(921600);
	USE_SERIAL.begin(115200);

	//Serial.setDebugOutput(true);
	USE_SERIAL.setDebugOutput(true);

	USE_SERIAL.println();
	USE_SERIAL.println();
	USE_SERIAL.println();

	for(uint8_t t = 4; t > 0; t--) {
		USE_SERIAL.printf("[SETUP] BOOT WAIT %d...\n", t);
		USE_SERIAL.flush();
		delay(1000);
	}

	WiFiMulti.addAP(ssid, password);

	//WiFi.disconnect();
	while(WiFiMulti.run() != WL_CONNECTED) {
		delay(100);
	}

	// server address, port and URL
	webSocket.begin(websockets_server_host, websockets_server_port, "/");

	// event handler
	webSocket.onEvent(webSocketEvent);

	// use HTTP Basic Authorization this is optional remove if not needed
	//webSocket.setAuthorization("user", "Password");

	// try ever 5000 again if connection has failed
	webSocket.setReconnectInterval(5000);

}

void loop() {
	webSocket.loop();
}