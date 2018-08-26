#include <Arduino.h>

void setup() {
  Serial.begin(115200);
	WiFiConnect();
	MQTTSetup();
	LCDA.Initialise();
}

void loop() {
	if (!client.connected()) {
    reconnect();
  }
  client.loop();

}
