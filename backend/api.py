from flask import Flask, jsonify, redirect, make_response
from flask_cors import CORS
import networking
import alarm

app = Flask(__name__)
CORS(app)

# Base url for API
BASE_URL = "/api"

#--- /start --#
@app.route("/")
def base():
    return redirect("/api");

@app.route(BASE_URL + "/")
def index():
    return jsonify({ "name": "jarvis-backend", "status": "running" })
#--- /end --#

#--- /alarm start --#
@app.route(BASE_URL + "/alarm/status")
def alarm_status():
    res = alarm.status()

    if res['alarm']['status'] == "disconnected":
        return make_response(jsonify(res), 500)
    else:
        return jsonify(res)

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

