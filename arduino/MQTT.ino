#include <PubSubClient.h>
#include <ESP8266WiFi.h>

const char* server = "192.168.43.183";
const char* ClientID = "SmartHome";

WiFiClient espClient;
PubSubClient client(espClient);

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

      client.publish("register", "woyaozhuc");
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

void MQTTSetup(){
	client.setServer(server, 1883);
  client.setCallback(callback);
}

void MQTTLoop(){
	if (!client.connected()) {
    reconnect();
  }

  client.loop();
}
