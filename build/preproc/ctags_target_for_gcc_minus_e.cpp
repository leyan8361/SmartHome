# 1 "d:\\Desktop\\bulb\\arduino\\Bulb.ino"
# 1 "d:\\Desktop\\bulb\\arduino\\Bulb.ino"
# 2 "d:\\Desktop\\bulb\\arduino\\Bulb.ino" 2
const int ledPin = 2;
const int maxValue = 255;

const int ID = 3;

/* payload: ID,[关/开]灯,颜色,亮度 */
void updateBulb(String payload){

 const int firstIndex = payload.indexOf(',');

 const int ClientID = payload.substring(0, firstIndex).toInt();

 if(ClientID != ID && ClientID != 0){
  return;
 }

 if(payload.indexOf("关灯")!=-1){
  Serial.println("关灯~");
  digitalWrite(ledPin,0x0);
 }else{
  /* payload: 0,[关/开]灯 */
  if(payload.indexOf(',',firstIndex + 1) == -1 && ClientID == 0 && payload.indexOf("开灯")!=-1){
   analogWrite(ledPin,maxValue);
   return;
  }

  const int length = payload.length();
  const int startIndex = length - 3;

  if(payload[startIndex]=='1'){// 亮度为100的情况
   analogWrite(ledPin,maxValue);
  } else {

   int value = payload.substring(startIndex+1).toInt();
   Serial.print("修改的亮度为: ");
   Serial.println(value);

   int brightness = 255*value/100;
   analogWrite(ledPin,brightness);
  }

  const int secondIndex = payload.indexOf(',',firstIndex + 1);
  const int thirdIndex = payload.indexOf(',',secondIndex + 1);

  String color = payload.substring(secondIndex,thirdIndex);

  Serial.print("修改的颜色为：");
  Serial.println(color);

 }

}
# 1 "d:\\Desktop\\bulb\\arduino\\MQTT.ino"
# 2 "d:\\Desktop\\bulb\\arduino\\MQTT.ino" 2
# 3 "d:\\Desktop\\bulb\\arduino\\MQTT.ino" 2
# 4 "d:\\Desktop\\bulb\\arduino\\MQTT.ino" 2

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
# 1 "d:\\Desktop\\bulb\\arduino\\WiFi.ino"
# 2 "d:\\Desktop\\bulb\\arduino\\WiFi.ino" 2

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
# 1 "d:\\Desktop\\bulb\\arduino\\index.ino"
# 2 "d:\\Desktop\\bulb\\arduino\\index.ino" 2

void setup() {
 pinMode(ledPin, 0x01);
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
