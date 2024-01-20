
import os
from flask import Flask, request, Response, make_response
from flask_cors import CORS, cross_origin
import sqlite3

DATABASE_PATH = "./database.db"

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
connection = None

@app.route("/")
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

from methods.create_playlist import create_playlist
@app.route("/create-playlist/")
def create_playlist_wrapper():
    name = request.args.get('name')
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

from methods.add_user_to_playlist import add_user_to_playlist
@app.route("/add-user-to-playlist/")
def add_user_to_playlist_wrapper():
    username = request.args.get('username')
    playlist_id = request.args.get('playlist_id')

    return add_user_to_playlist(username, playlist_id)

from methods.sign_in import sign_in
@app.route("/sign-in/")
@cross_origin()
def sign_in_wrapper():
    if request.method == "OPTIONS": # CORS preflight
        return build_cors_preflight_response()
    elif request.method == "GET": # actual request

        username = request.args.get('username')
        pass_hash = request.args.get('password')

        return (sign_in(username, pass_hash))
    else:
        raise RuntimeError("Weird - don't know how to handle method {}".format(request.method))

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

# =================================

def main(port=5000) -> None:
    global connection
    print("\n\n\nInitializing")

    os.environ["DB_PATH"] = DATABASE_PATH

    print("Connecting to database")
    connection = sqlite3.connect(DATABASE_PATH)
    cursor = connection.cursor()
    cursor.execute("CREATE TABLE IF NOT EXISTS Users (UserID INTEGER PRIMARY KEY, Username TEXT, Password TEXT);")
    cursor.execute("CREATE TABLE IF NOT EXISTS Playlists (PlaylistID INTEGER PRIMARY KEY, PlaylistName TEXT);")
    cursor.execute("CREATE TABLE IF NOT EXISTS UserPlaylist (UserPlaylistID INTEGER PRIMARY KEY, PlaylistID INTEGER, UsernameID INTEGER);")
    cursor.execute("CREATE TABLE IF NOT EXISTS Sessions (SessionID INTEGER PRIMARY KEY, UserID INTEGER, Token TEXT, LastUsedTimestamp INTEGER);")

    # TEMP fake user john
    print("Inserting fake user john")
    result = cursor.execute(f"SELECT UserID, Username, Password FROM Users where Username == \"john\";").fetchone()
    if result == None:
        cursor.execute(f"INSERT INTO Users (Username, Password) VALUES (\"john\", \"password\");")


    connection.commit()
    connection.close()

    print("Starting flask\n------------------------")
    app.run(port=port)

if __name__ == "__main__":
    main()