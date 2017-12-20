#include "SPI.h"
#include "MFRC522.h"

#define SS_PIN 10
#define RST_PIN 9
#define SP_PIN 8

MFRC522 rfid(SS_PIN, RST_PIN);

MFRC522::MIFARE_Key key;

int greenLEDPin = 7;
int redLEDPin = 8;
boolean locked = true;
boolean reading = false;
boolean blinking = false;
String tags[5]= "24:60:E5:DB";

void setup() {
  Serial.begin(9600);
  SPI.begin();
  rfid.PCD_Init();

  pinMode(greenLEDPin, OUTPUT);
  pinMode(redLEDPin, OUTPUT);
}

void loop() {

  if (reading) {
    if (!rfid.PICC_IsNewCardPresent() || !rfid.PICC_ReadCardSerial()) {
      blinking = !blinking;
      blink();
      return;
    }

    String tagID = getTagID();
    Serial.println(tagID);
    reading = false;
    turnLedsOFF();
    delay(2000);
  }
  
  updateLeds();

  if (Serial.available()) {
    String input = Serial.readStringUntil('\n');
    if (input.equals("ALARM_ARM")) {
      locked = true;
    } else if (input.equals("ALARM_DISARM")) {
      locked = false;
    } else if (input.equals("ALARM_STATUS")) {
      if (locked) {
        Serial.println("ARMED");
      } else {
        Serial.println("DISARMED");
      }
    } else if (input.equals("READ_TAG")) {
        reading = true;
        return;
    } else if (input.equals("ADD_TAG")) {
        
    }
  }
    
  if (!rfid.PICC_IsNewCardPresent() || !rfid.PICC_ReadCardSerial())
    return;

  MFRC522::PICC_Type piccType = rfid.PICC_GetType(rfid.uid.sak);


  String tagID = getTagID();
  boolean match = false;
  for (int i = 0; i < sizeof(tags); i++) {
    if (tagID.equals(tags[i])) {
      match = true;
      if (locked) {
        Serial.println("Alarm disarmed using tag " + tagID + ".");
      } else {
        Serial.println("Alarm armed using tag " + tagID + ".");
      }

      locked = !locked;
      
      break;
    }
  }

  if (!match) {
    Serial.println("Tag " + tagID + " is not recognized.");    
  }
  
  rfid.PICC_HaltA();
  rfid.PCD_StopCrypto1();
}

String getTagID() {
  String tagID = "";
  for (byte i = 0; i < 4; i++) {
    tagID +=
    (rfid.uid.uidByte[i] < 0x10 ? "0" : "") +
    String(rfid.uid.uidByte[i], HEX) +
    (i!=3 ? ":" : "");
  }
  tagID.toUpperCase();
  return tagID;
}

void updateLeds() {
  if (locked) {
    digitalWrite(redLEDPin, HIGH);
    digitalWrite(greenLEDPin, LOW);
  } else {
    digitalWrite(redLEDPin, LOW);
    digitalWrite(greenLEDPin, HIGH);
  }
}

void blink() {
  if (blinking) {
    digitalWrite(redLEDPin, HIGH);
    digitalWrite(greenLEDPin, LOW);  
  } else {
    digitalWrite(redLEDPin, LOW);
    digitalWrite(greenLEDPin, HIGH);  
  }
  delay(100);
}

void turnLedsOFF() {
  digitalWrite(redLEDPin, LOW);
  digitalWrite(greenLEDPin, LOW);  
}
