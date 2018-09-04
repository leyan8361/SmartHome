#include <Arduino.h>

void setup() {
	pinMode(ledPin, OUTPUT);
  Serial.begin(115200);
	WiFiConnect();
	MQTTSetup();
}

void loop() {
	reconnect();
  client.loop();

}
