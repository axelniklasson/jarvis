import os
import time
import datetime
import errno
    
def get_timestamp():
    ts = time.time()
    return datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S')

def log(filename, msg):
    path = os.getcwd() + "/logs/" + filename
    if not os.path.exists(os.path.dirname(path)):
        try:
            os.makedirs(os.path.dirname(path))
        except OSError as exc: # Guard against race condition
            if exc.errno != errno.EEXIST:
                raise
    with open(path, "a") as log:
        log.write(get_timestamp() + " - " + msg + "\n")
