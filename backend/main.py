
import os
import json
from flask import Flask, request, Response, make_response, jsonify
from flask_cors import CORS
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials, SpotifyOAuth
import sqlite3
from methods.verify_session import verify_session
from private_tokens import *

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

from methods.add_user_to_playlist import add_user_to_playlist
@app.route("/add-user-to-playlist/")
def add_user_to_playlist_wrapper() -> Response:
    username = request.args.get('username')
    playlist_id = request.args.get('playlist_id')

    return add_user_to_playlist(username, playlist_id)


from methods.sign_in import sign_in
@app.route("/sign-in/")
@handle_cors
def sign_in_wrapper() -> Response:
    username = request.args.get('username')
    pass_hash = request.args.get('password')

    return (sign_in(username, pass_hash))

from methods.create_account import create_account
@app.route("/create-account/")
def create_account_wrapper() -> Response:
    username = request.args.get('username')
    pass_hash = request.args.get('password')

    return create_account(username, pass_hash)


from methods.create_playlist import create_playlist
@app.route("/create-playlist/")
def create_playlist_wrapper() -> Response:
    name = request.args.get('name')
    session_token = request.args.get('session')
    if not verify_session(session_token):
        return make_response(jsonify({ "message": f"Invalid session" }), 400)
    # TODO
    return create_playlist(name)

from methods.get_playlists import get_playlists
@app.route("/get-playlists/")
def get_playlists_wrapper() -> Response:
    session_token = request.args.get('session')
    if not verify_session(session_token):
        return make_response(jsonify({ "message": f"Invalid session" }), 400)

    return get_playlists(session_token)

from methods.get_playlist_info import get_playlist_info
@app.route("/get-playlist-info/")
def get_playlist_info_wrapper() -> Response:
    playlist_id = request.args.get('id')
    return get_playlist_info(playlist_id)

from methods.vote import vote
@app.route("/vote/")
def vote_wrapper() -> Response:
    session_token = request.args.get('session')
    if not verify_session(session_token):
        return make_response(jsonify({ "message": f'Invalid session' }), 400)

    return vote(playlist_id, song_uri, yesno)

# MAIN ======================================================================
def main(port=5000) -> None:
    print("\n\n\nInitializing")

    os.environ["DB_PATH"] = DATABASE_PATH
    os.environ["SESSION_TIMEOUT_LEN"] = str(SESSION_TIMEOUT_LEN)

    print("Connecting to spotify")
    os.environ["SPOTIPY_CLIENT_ID"] = client_id
    os.environ["SPOTIPY_CLIENT_SECRET"] = client_secret
    os.environ["SPOTIPY_REDIRECT_URI"] = "http://localhost:9000"

    spotify = spotipy.Spotify(auth_manager=SpotifyOAuth(scope="playlist-modify-public"))
    print(spotify.current_user())
    os.environ["USER_ID"] = '3155xuovzdtbx6zmcnmytz3qg6yi'

    spotify.user_playlist_create(USER_ID, 'test playlist', public=True, collaborative=False, description='testing')

    """headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
    body = {
        'client_id': client_id,
        'client_secret': client_secret,
        'grant_type': "client_credentials"
    }
    r = requests.post('https://accounts.spotify.com/api/token', data=body, headers=headers)
    if r.status_code != 200:
        print("Failed")
        print(r.text)
        return
    r = json.loads(r.text)
    os.environ["SPOTIFY_ACCESS_TOKEN"] = r["access_token"]"""

    print("Connecting to database")
    connection = sqlite3.connect(DATABASE_PATH)
    cursor = connection.cursor()
    cursor.execute("CREATE TABLE IF NOT EXISTS Users (UserID INTEGER PRIMARY KEY, Username TEXT, Password TEXT);")
    cursor.execute("CREATE TABLE IF NOT EXISTS Playlists (PlaylistID INTEGER PRIMARY KEY, PlaylistName TEXT);")
    cursor.execute("CREATE TABLE IF NOT EXISTS UserPlaylist (UserPlaylistID INTEGER PRIMARY KEY, PlaylistID INTEGER, UserID INTEGER);")
    cursor.execute("CREATE TABLE IF NOT EXISTS Sessions (SessionID INTEGER PRIMARY KEY, UserID INTEGER, Token TEXT, LastUsedTimestamp INTEGER);")
    cursor.execute("CREATE TABLE IF NOT EXISTS Votes (PlaylistID INTEGER, TrackURI TEXT, UserID INTEGER, YesNo INTEGER, PRIMARY KEY (PlaylistID, TrackURI, UserID))")

    # TEMP fake user john
    print("Inserting fake user john and his music")
    john_id = cursor.execute(f"SELECT UserID FROM Users WHERE Username=\"john\";").fetchone()[0]
    cursor.execute("DELETE FROM Users WHERE Username=\"john\";")
    cursor.execute("DELETE FROM Playlists WHERE PlaylistName=\"john's playlist\";")
    cursor.execute("DELETE FROM Playlists WHERE PlaylistName=\"john's playlist 2\";")
    cursor.execute(f"DELETE FROM UserPlaylist WHERE UserID=\"{john_id}\";")

    cursor.execute(f"INSERT INTO Users (Username, Password) VALUES (\"john\", \"password\");")
    john_id = cursor.execute(f"SELECT UserID FROM Users WHERE Username=\"john\";").fetchone()[0]

    cursor.execute(f"INSERT INTO Playlists (PlaylistName) VALUES (\"john's playlist\");")
    playlist_id = cursor.execute(f"SELECT PlaylistID FROM Playlists WHERE PlaylistName=\"john's playlist\";").fetchone()[0]
    cursor.execute(f"INSERT INTO UserPlaylist (PlaylistID, UserID) VALUES (\"{playlist_id}\", \"{john_id}\");").fetchone()
    print(playlist_id)

    cursor.execute(f"INSERT INTO Playlists (PlaylistName) VALUES (\"john's playlist 2\");")
    playlist_id = cursor.execute(f"SELECT PlaylistID FROM Playlists WHERE PlaylistName=\"john's playlist 2\";").fetchone()[0]
    cursor.execute(f"INSERT INTO UserPlaylist (PlaylistID, UserID) VALUES (\"{playlist_id}\", \"{john_id}\");").fetchone()
    print(playlist_id)

    result = cursor.execute("SELECT * FROM Users").fetchall()
    print("users", result)

    result = cursor.execute("SELECT * FROM Playlists").fetchall()
    print("playlists", result)

    result = cursor.execute("SELECT * FROM UserPlaylist").fetchall()
    print("userplaylist", result)


    connection.commit()
    connection.close()

    print("Starting flask\n------------------------")
    app.run(port=port)

if __name__ == "__main__":
    main()