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
String tags[5]= "24:60:E5:DB";

void setup() {
  Serial.begin(9600);
  SPI.begin();
  rfid.PCD_Init();

  pinMode(greenLEDPin, OUTPUT);
  pinMode(redLEDPin, OUTPUT);
}

void loop() {
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
    } else {
      Serial.println(input);
      Serial.println("Command not recognized.");
    }
  }
    
  if (!rfid.PICC_IsNewCardPresent() || !rfid.PICC_ReadCardSerial())
    return;

  // Serial.print(F("PICC type: "));
  MFRC522::PICC_Type piccType = rfid.PICC_GetType(rfid.uid.sak);
  // Serial.println(rfid.PICC_GetTypeName(piccType));

  // Check is the PICC of Classic MIFARE type
  if (piccType != MFRC522::PICC_TYPE_MIFARE_MINI &&
    piccType != MFRC522::PICC_TYPE_MIFARE_1K &&
    piccType != MFRC522::PICC_TYPE_MIFARE_4K) {
    Serial.println(F("Tag is not of type MIFARE Classic."));
    return;
  }

  String strID = "";
  for (byte i = 0; i < 4; i++) {
    strID +=
    (rfid.uid.uidByte[i] < 0x10 ? "0" : "") +
    String(rfid.uid.uidByte[i], HEX) +
    (i!=3 ? ":" : "");
  }
  strID.toUpperCase();

  boolean match = false;
  for (int i = 0; i < sizeof(tags); i++) {
    if (strID.equals(tags[i])) {
      match = true;
      if (locked) {
        Serial.println("Alarm disarmed using tag " + strID + ".");
      } else {
        Serial.println("Alarm armed using tag " + strID + ".");
      }

      locked = !locked;
      
      break;
    }
  }

  if (!match) {
    Serial.println("Tag " + strID + " is not recognized.");    
  }
  
  rfid.PICC_HaltA();
  rfid.PCD_StopCrypto1();
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

