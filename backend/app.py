from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from flask_cors import CORS
from datetime import datetime

# Creating a flask app and using it to instantiate a socket object
app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins='*')

pixels = []

# Handler for default flask route
# Using jinja template to render html along with slider value as input
@app.route("/")
def index():
    return render_template("index.html", **values)

# Handler for a message recieved over 'connect' channel
@socketio.on("connect")
def test_connect():
    emit("after connect", {"data": "Lets dance"})

@socketio.on("update_pixel")
def update_pixel(message):
    print(message)
    pixel = {
        'chunk': message['chunk'],
        'x': message['x'],
        'y': message['y'],
        'color': message['color'],
        #TODO: Figure out how to get IP
        'metadata': {
            'created_by': 'someone',
            'created_at': datetime.now()
        }
    }
    pixels.append(pixel)

#Instantiate socketio app
if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0")
