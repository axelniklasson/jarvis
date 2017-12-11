# Jarvis
Code base for what is supposed to become a somewhat working home automation system.

## Set up development environment
Make sure [virtualenv](https://virtualenv.pypa.io/en/stable/) is installed and then run 
```
git clone https://github.com/axelniklasson/jarvis.git && cd jarvis
virtualenv .
source bin/activate
pip install -r requirements.txt
```

That's it really.

To run the backend server, simply run the flask server along with the helper script in two terminals

```
FLASK_APP=backend/api.py flask run
```
and
```
chmod +x helper.sh
./helper.sh
```

and the server can be found on ```http://localhost:5000/api```.
