from flask import Flask
from flask import jsonify
from flask_cors import CORS

import networking

app = Flask(__name__)
CORS(app)

# Base url for API
BASE_URL = "/api"

# Adds base url to path and returns result
#
# param: path - string
#
# Returns full path
def prepend_base_url(path):
    return BASE_URL + path

#--- /start --#
@app.route(prepend_base_url("/"))
def index():
    return jsonify({ "name": "jarvis-backend", "status": "running" })
#--- /end --#

#--- /network start --#

@app.route(prepend_base_url("/network/active"))
def active_hosts():
    hosts = networking.get_active_hosts()
    return jsonify(hosts)
#--- /network end --#
