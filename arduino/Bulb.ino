#include<Arduino.h>
#include<Syn6288.h>
#include<LCD12864RSPI.h>
#define AR_SIZE(a) sizeof(a) / sizeof(a[0])

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
		Serial.println(out[i],HEX);
		Serial.println("-------------");
	}

	delay(100);
	LCDA.DisplayString(0, 2, out, AR_SIZE(out));
	delay(100);
	LCDA.DisplayString(2, 1, out, AR_SIZE(out));

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
