#include<Arduino.h>
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
		digitalWrite(ledPin,LOW);
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
