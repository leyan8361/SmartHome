#include <Arduino.h>

void setup() {
  Serial.begin(115200);
  WiFiConnect();
	MQTTSetup();
}

void loop() {
	if (!client.connected()) {
    reconnect();
  }

  client.loop();
}
