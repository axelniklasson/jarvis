import arduino

connector = arduino.get_connector()

def read_tag():
    if connector is not None:
        connector.write("READ_TAG")
        tag_id = connector.read_line()
        return { "tagID": tag_id }
