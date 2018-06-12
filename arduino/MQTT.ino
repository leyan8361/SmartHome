#include <PubSubClient.h>
#include <ESP8266WiFi.h>
#include <string.h>

const char* server = "192.168.43.183";
const char* ClientID = "SmartHome";

WiFiClient espClient;
PubSubClient client(espClient);

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.println("] ");
	String msg = "";
	for (int i = 0; i < length; i++){
		Serial.print((char)payload[i]);
		msg += (char)payload[i];
	}
	Serial.println();

	Serial.println(msg);

	if(strcmp(topic,"bulb")==0){
		Serial.println("已成功收到灯泡消息！");

		Serial.println();

		updateBulb(msg);
	}
}

void reconnect(){
   while (!client.connected()) {
     Serial.print("正在连接到服务器。。。");

    //尝试连接
    if (client.connect(ClientID)) {
      Serial.println("已连接到服务器");

      //订阅
      client.subscribe("bulb");

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


// char* msgStr="";
// void TopicPublish(){
//   // 建立MQTT訊息（JSON格式的字串）
//   msgStr = msgStr + "{\"temp\":" + (19 + random(10)) + ",\"humid\":" + 20 + "}";
//   // 把String字串轉換成字元陣列格式
//   msgStr.toCharArray(json, 25);
//   // 發布MQTT主題與訊息
//   client.publish(topic, json);
//   // 清空MQTT訊息內容
//   msgStr = "";

//   delay(5000);
// }
