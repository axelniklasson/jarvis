from flask import Flask
from flask import jsonify
from flask_cors import CORS

import networking


app = Flask(__name__)
CORS(app)

# Base url for API
BASE_URL = "/api"


#--- /start --#
@app.route(BASE_URL + "/")
def index():
    return jsonify({ "name": "jarvis-backend", "status": "running" })
#--- /end --#

#--- /network start --#
@app.route(BASE_URL + "/network/active")
def active_hosts():
    hosts = networking.get_active_hosts()
    return jsonify(hosts)
#--- /network end --#
