import serial

connector = None
def get_connector(port="/dev/cu.usbmodem1421"):
    if connector is None:
        return ArduinoConnector(port)
    else:
        return connector

class ArduinoConnector:
    def __init__(self, port="/dev/cu.usbmodem1421", baud=9600):
        connector = None
        self.port = port
        self.baud = baud
        self.connect()

    def connect(self):
        try:
            self.connection = serial.Serial(self.port, self.baud)
        except serial.SerialException:
            self.connection = None
            raise ValueError("Couldn't connect to Arduino over specified port %s" % self.port)

    def write(self, msg):
        self.flush()
        self.connection.write(msg + "\n")

    def read_line(self):
        return self.connection.readline().rstrip()

    def flush(self):
        try:
            if self.connection.in_waiting > 0:
                while (self.connection.in_waiting > 0):
                    # Print this to logfile instead
                    print self.read_line()
        except:
            self.connection.close()
            self.__init__()

