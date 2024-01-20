
import os
from flask import Flask, request, Response, make_response, jsonify
from flask_cors import CORS
import sqlite3
from methods.verify_session import verify_session

DATABASE_PATH = "./database.db"
SESSION_TIMEOUT_LEN = 3600 # seconds in one hour

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# ==== CORS STUFF =====================
def build_cors_preflight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response

def corsify(response: Response) -> Response:
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

def handle_cors(func):
    def inner():
        if request.method == "OPTIONS": # CORS preflight
            return build_cors_preflight_response()
        elif request.method == "GET": # actual request
            return func()
        else:
            raise RuntimeError(f"Failed to hand method {request.method}")
    inner.__name__ = func.__name__
    return inner

# =================================

@app.route("/")
@handle_cors
def hello_world():
    return "<h1>Base route</h1>"

from methods.create_account import create_account
@app.route("/create-account/", methods=['POST','GET'])
def create_account_wrapper():
    #create_account(connection)
    """cursor = connection.cursor()
    result = cursor.execute("INSERT INTO Users\nVALUES (test_user, password1);")
    connection.commit()
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        return create_account(username, password)
    else:
        return render_template('testing/form.html')"""
    #return create_account()

from methods.add_user_to_playlist import add_user_to_playlist
@app.route("/add-user-to-playlist/")
def add_user_to_playlist_wrapper():
    username = request.args.get('username')
    playlist_id = request.args.get('playlist_id')

    return add_user_to_playlist(username, playlist_id)


from methods.sign_in import sign_in
@app.route("/sign-in/")
@handle_cors
def sign_in_wrapper():
    username = request.args.get('username')
    pass_hash = request.args.get('password')

    return (sign_in(username, pass_hash))

from methods.create_playlist import create_playlist
@app.route("/create-playlist/")
def create_playlist_wrapper():
    name = request.args.get('name')
    session_token = request.args.get('session')
    if not verify_session(session_token):
        return make_response(jsonify({ "message": f"Invalid session" }), 400)
    create_playlist(name)

    # print all playlists
    """connection = sqlite3.connect(os.environ["DB_PATH"])
    cursor = connection.cursor()
    result = cursor.execute(f"SELECT * FROM Playlists;")
    p = result.fetchone()
    while p != None:
        print(p)
        p = result.fetchone()
    connection.commit()
    connection.close()"""

    return Response("success", mimetype='text/plain')


# MAIN ======================================================================
def main(port=5000) -> None:
    print("\n\n\nInitializing")

    os.environ["DB_PATH"] = DATABASE_PATH
    os.environ["SESSION_TIMEOUT_LEN"] = str(SESSION_TIMEOUT_LEN)

    print("Connecting to database")
    connection = sqlite3.connect(DATABASE_PATH)
    cursor = connection.cursor()
    cursor.execute("CREATE TABLE IF NOT EXISTS Users (UserID INTEGER PRIMARY KEY, Username TEXT, Password TEXT);")
    cursor.execute("CREATE TABLE IF NOT EXISTS Playlists (PlaylistID INTEGER PRIMARY KEY, PlaylistName TEXT);")
    cursor.execute("CREATE TABLE IF NOT EXISTS UserPlaylist (UserPlaylistID INTEGER PRIMARY KEY, PlaylistID INTEGER, UsernameID INTEGER);")
    cursor.execute("CREATE TABLE IF NOT EXISTS Sessions (SessionID INTEGER PRIMARY KEY, UserID INTEGER, Token TEXT, LastUsedTimestamp INTEGER);")

    # TEMP fake user john
    print("Inserting fake user john and his music")
    result = cursor.execute(f"SELECT UserID, Username, Password FROM Users WHERE Username == \"john\";").fetchone()
    if result == None:
        cursor.execute(f"INSERT INTO Users (Username, Password) VALUES (\"john\", \"password\");")


    connection.commit()
    connection.close()

    print("Starting flask\n------------------------")
    app.run(port=port)

if __name__ == "__main__":
    main()