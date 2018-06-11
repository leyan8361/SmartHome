#include <ESP8266WiFi.h>

const char* ssid = "Simon";
const char* password = "46666890";

void WiFiConnect() {

	delay(10);
	Serial.println();
	Serial.print("正在连接到");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  randomSeed(micros());
  Serial.println("");
  Serial.println("已连接到WiFi");
  Serial.println("当前IP: ");
  Serial.println(WiFi.localIP());
}
