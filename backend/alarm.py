from flask import abort
import serial

import logger

ARDUINO = serial.Serial("/dev/cu.usbmodem1421", 9600)
# ARDUINO = serial.Serial("/dev/ttyACM0", 9600)
LOG_FILE = "alarm.log"

def read():
    while (ARDUINO.inWaiting() > 0):
        logger.log(LOG_FILE, ARDUINO.readline().rstrip())

def arm():
    read()
    ARDUINO.write("ALARM_ARM\n")
    logger.log(LOG_FILE, "Alarm armed from API.")
    return status()

def disarm():
    read()
    ARDUINO.write("ALARM_DISARM\n")
    logger.log(LOG_FILE, "Alarm disarmed from API.")
    return status()

def status():
    read()
    ARDUINO.write("ALARM_STATUS\n")
    status = ARDUINO.readline().rstrip()
    if status == "ARMED":
        return { "alarm": { "status": "armed" } }
    elif status == "DISARMED":
        return { "alarm": { "status": "disarmed" } }
    else:
        abort(500)
