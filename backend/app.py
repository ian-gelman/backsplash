from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit
from flask_cors import CORS
from datetime import datetime

# Creating a flask app and using it to instantiate a socket object
app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins='*')

pixels = []

# Handler for default flask route
#@app.route("/")
#def index():
#    return render_template("../frontend/src/index.js")

# Handler for a message recieved over 'connect' channel
@socketio.on("connect")
def test_connect():
    emit("after connect", {"data": "unga bunga"})

@socketio.on("update_pixel")
def update_pixel(message):
    pixel = {
        'chunk': message['chunk'],
        'x': message['x'],
        'y': message['y'],
        'color': message['color'],
        'metadata': {
            'created_by': request.remote_addr, #untested
            'created_at': str(datetime.now())
        }
    }
    pixels.append(pixel)
    print(pixel)

#Instantiate socketio app
if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0")
