from flask import Flask
from flask import jsonify
from flask_cors import CORS

import networking
import alarm

app = Flask(__name__)
CORS(app)

# Base url for API
BASE_URL = "/api"

# Path to log file for API
LOG_FILE = "api.log"

#--- /start --#
@app.route(BASE_URL + "/")
def index():
    return jsonify({ "name": "jarvis-backend", "status": "running" })
#--- /end --#

#--- /alarm start --#
@app.route(BASE_URL + "/alarm/status")
def alarm_status():
    return jsonify(alarm.status())

@app.route(BASE_URL + "/alarm/arm", methods = ["POST"])
def alarm_arm():
    return jsonify(alarm.arm())

@app.route(BASE_URL + "/alarm/disarm", methods = ["POST"])
def alarm_disarm():
    return jsonify(alarm.disarm())
#--- /alarm end --#

#--- /network start --#
@app.route(BASE_URL + "/network/active")
def active_hosts():
    hosts = networking.get_active_hosts()
    return jsonify(hosts)
#--- /network end --#
