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

#include <ArduinoWebsockets.h>
#include <WiFi.h>

const char* ssid = "2.4 875 NW Calliope Unit 104"; //Enter SSID
const char* password = "CXNK00597744"; //Enter Password
const char* websockets_server_host = "192.168.10.50"; //Enter server adress
const uint16_t websockets_server_port = 8080; // Enter server port

const int pin_1 = 4;

using namespace websockets;

DynamicJsonDocument doc(2048);

void handleInstruction() {

}


char**  getInstruction(String payload) {

  const char* data = payload.c_str();

  deserializeJson(doc, data);
  /*if(error) {
    Serial.print(F("deserializeJson() failed: "));
    Serial.println(error.c_str());
    return NULL;
  }*/

  const String source_id = doc["sourceID"];

  char** instruction = doc["instructions"];

  Serial.print(F("Instrucitons: "));
  Serial.printf("targetType: %s, command: %s, pin: %s \n ", instruction[0], instruction[1], instruction[2]);

  return instruction;
}

void onMessageCallback(WebsocketsMessage message) {
    Serial.print("Got Message: ");
    Serial.println(message.data());
}

void onEventsCallback(WebsocketsEvent event, String data) {
    if(event == WebsocketsEvent::ConnectionOpened) {
        Serial.println("Connnection Opened");
    } else if(event == WebsocketsEvent::ConnectionClosed) {
        Serial.println("Connnection Closed");
    } else if(event == WebsocketsEvent::GotPing) {
        Serial.println("Got a Ping!");
    } else if(event == WebsocketsEvent::GotPong) {
        Serial.println("Got a Pong!");
    }
}

WebsocketsClient client;
void setup() {
    Serial.begin(115200);
    // Connect to wifi
    WiFi.begin(ssid, password);

    // Wait some time to connect to wifi
    for(int i = 0; i < 10 && WiFi.status() != WL_CONNECTED; i++) {
        Serial.print(".");
        delay(1000);
    }

    // run callback when messages are received
    client.onMessage(onMessageCallback);
    
    // run callback when events are occuring
    client.onEvent(onEventsCallback);

    // Connect to server
    client.connect(websockets_server_host, websockets_server_port, "/");

    // Send a message
    client.send("Hello Server");

    // Send a ping
    client.ping();
}

void loop() {
    client.poll();
}