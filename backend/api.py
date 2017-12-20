from flask import Flask, jsonify, redirect, make_response, request, abort, Response
from flask_cors import CORS
import networking
import alarm
import tags

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

#--- /tags start --#
@app.route(BASE_URL + "/tags/read")
def read_tag():
    return jsonify(tags.read_tag())

@app.route(BASE_URL + "/tags/add", methods = ["POST"])
def add_tag():
    tagID = request.args.get('tagid')
    tags.add_tag(tagID)
    return jsonify({ "success": True, "message": "Your tag is now added!" })

@app.route(BASE_URL + "/tags/remove", methods = ["POST"])
def remove():
    tagID = request.args.get('tagid')
    tags.remove_tag(tagID)
    return jsonify({ "success": True, "message": "Your tag is now removed!" })

@app.route(BASE_URL + "/tags/validate", methods = ["POST"])
def validate():
    tagID = request.args.get('tagid')
    if tags.validate(tagID):
        return jsonify({ "success": True })
    else:
        return make_response(jsonify({ "success": False, "message": "Your tag is not authorized." }), 401)
#--- /network end --#
