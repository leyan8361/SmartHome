# 1 "d:\\Desktop\\bulb\\arduino\\Bulb.ino"
# 1 "d:\\Desktop\\bulb\\arduino\\Bulb.ino"
# 2 "d:\\Desktop\\bulb\\arduino\\Bulb.ino" 2
# 3 "d:\\Desktop\\bulb\\arduino\\Bulb.ino" 2
# 4 "d:\\Desktop\\bulb\\arduino\\Bulb.ino" 2


Syn6288 syn;

String getOpBulb(int ClientID){
 String result = "";
 switch(ClientID){
  case 0:
   result="所有小灯";
   break;
  case 1:
   result="阳台灯";
   break;
  case 2:
   result="卧室灯";
   break;
  case 3:
   result="厕所灯";
   break;
  default:
   result="电器";

 }
 return result;
}
void ShowOp(String word){
 LCDA.CLEAR();
 const int len = word.length();
 Serial.println(len);
 Serial.println();
 unsigned char out[len];

 Serial.println(word);
 Serial.println();

 for (int i = 0; i < len; ++i){
  Serial.println(word[i]);

  out[i] = 0XFF & word[i];
  Serial.println(out[i],16);
  Serial.println("-------------");
 }

 delay(100);
 LCDA.DisplayString(0, 2, out, sizeof(out) / sizeof(out[0]));
 delay(100);
 LCDA.DisplayString(2, 1, out, sizeof(out) / sizeof(out[0]));

 syn.play(out, sizeof(out), 1);
}
/* payload: ID,[关/开]灯,颜色,亮度 */
void updateBulb(String payload){

 const int firstIndex = payload.indexOf(',');

 const int ClientID = payload.substring(0, firstIndex).toInt();

 String bulb = getOpBulb(ClientID);
 if (payload.indexOf("关灯") != -1)
 {
  String word = bulb + "关灯成功";
  return ShowOp(word);
 }
 String brightness = "100";

 const int length = payload.length();
 const int startIndex = length - 3;

 if(payload[startIndex]!='1'){// 亮度为100的情况
  brightness = payload.substring(startIndex + 1);
 }

 const int secondIndex = payload.indexOf(',',firstIndex + 1);
 const int thirdIndex = payload.indexOf(',',secondIndex + 1);

 String color = payload.substring(secondIndex,thirdIndex);

 String word = bulb + "已成功接收指令,亮度设置为百分之" + brightness + "颜色设置为" + color;

 ShowOp(word);

}
# 1 "d:\\Desktop\\bulb\\arduino\\MQTT.ino"
# 2 "d:\\Desktop\\bulb\\arduino\\MQTT.ino" 2
# 3 "d:\\Desktop\\bulb\\arduino\\MQTT.ino" 2
# 4 "d:\\Desktop\\bulb\\arduino\\MQTT.ino" 2

const char* server = "192.168.43.183";
const int port = 8888;

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
 client.setServer(server, port);
  client.setCallback(callback);
}

void MQTTLoop(){
 if (!client.connected()) {
    reconnect();
  }

  client.loop();
}
# 1 "d:\\Desktop\\bulb\\arduino\\WiFi.ino"
# 2 "d:\\Desktop\\bulb\\arduino\\WiFi.ino" 2

const char* ssid = "Simon's Mi";
const char* password = "1755811882";

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
