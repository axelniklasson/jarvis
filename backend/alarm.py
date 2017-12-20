from flask import abort
import arduino
import serial

connector = arduino.get_connector()

def arm():
    if connector is not None:
        connector.write("ALARM_ARM")
        return status()

    abort(500)

def disarm():
    if connector is not None:
        connector.write("ALARM_DISARM")
        return status()

    abort(500)

def status():
    if connector is not None:
        connector.write("ALARM_STATUS")
        status = connector.read_line()
        if status == "ARMED":
            return { "alarm": { "status": "armed" } }
        elif status == "DISARMED":
            return { "alarm": { "status": "disarmed" } }
        else:
            abort(500) # error fallback
    
    return { "alarm": { "status": "disconnected" } }
