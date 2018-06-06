#include <ESP8266WiFi.h>
#include <PubSubClient.h>

const char* ssid = "Simon";
const char* password = "46666890";
const char* server = "192.168.43.183";
const char* ClientID = "SmartHome";
const int bulbID = 2;

WiFiClient espClient;
PubSubClient client(espClient);

void setupWifi() {

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

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i=0;i<length;i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();
}

void reconnect(){
   while (!client.connected()) {
     Serial.print("正在连接到服务器。。。");

    //尝试连接
    if (client.connect(ClientID)) {
      Serial.println("已连接到服务器");

      client.publish("light", "hello world");
      //订阅
      client.subscribe("testMQTT");

    } else {
      Serial.print("连接失败：");
      Serial.println(client.state());
      Serial.println("3秒后重试");
      delay(3000);
    }
  }

}

void setup() {
  Serial.begin(115200);
  setupWifi();
  client.setServer(server, 1883);
  client.setCallback(callback);
}

void loop() {

  if (!client.connected()) {
    reconnect();
  }
  client.loop();

}
