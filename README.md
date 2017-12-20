# Jarvis
Code base for what is supposed to become a somewhat working home automation system.

## Set up development environment
### Backend
Make sure [virtualenv](https://virtualenv.pypa.io/en/stable/) is installed and then run 
```
git clone https://github.com/axelniklasson/jarvis.git && cd jarvis/backend
virtualenv .
source bin/activate
pip install -r requirements.txt
```

That's it really.

To run the backend server, simply run the flask server (make sure you have activated the ```virtualenv``` first)

```
FLASK_APP=app/api.py flask run
```

and the server can be found on ```http://localhost:5000/api```.

### Frontend
```
cd frontend
npm install
npm start
```

The development server can be found at ```http://localhost:3000/```

To build for production, run
```
npm run build
```
