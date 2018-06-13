#include<Arduino.h>
const int ledPin = 2;
const int maxValue = 255;

void updateBulb(String payload){

	if(payload.indexOf("关灯")!=-1){
		Serial.println("关灯~");
		digitalWrite(ledPin,LOW);
	}else{

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

		const int firstIndex = payload.indexOf(',')+1;
		const int secondIndex = payload.indexOf(',',firstIndex);

		String color = payload.substring(firstIndex,secondIndex);

		Serial.print("修改的颜色为：");
		Serial.println(color);


	}

}
