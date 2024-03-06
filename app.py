from flask import Flask, render_template, request
from flask_socketio import SocketIO
import sqlite3

app = Flask(__name__)
socketio = SocketIO(app)

def create_database_connection():
    return sqlite3.connect('chatroom.db')

# Create the 'messages' table if it does not exist
with create_database_connection() as conn:
    cursor = conn.cursor()
    cursor.execute('CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT)')
    conn.commit()

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('message')
def handle_message(msg):
    # Create a new database connection and cursor
    with create_database_connection() as conn:
        cursor = conn.cursor()

        # Store the message in the database
        cursor.execute('INSERT INTO messages (content) VALUES (?)', (msg,))
        conn.commit()

    # Broadcast the message to all clients
    socketio.emit('message', msg)

if __name__ == '__main__':
    socketio.run(app, debug=True)



