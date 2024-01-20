
import os
import flask
import sqlite3

DATABASE_PATH = "./database.db"

app = flask.Flask(__name__)
connection = None

@app.route("/")
def hello_world():
    return "<h1>Base route</h1>"

from methods.create_account import create_account
@app.route("/create-account/", methods=['POST'])
def create_account_wrapper():
    create_account(connection)
    """cursor = connection.cursor()
    result = cursor.execute("INSERT INTO Users\nVALUES (test_user, password1);")
    connection.commit()"""
    return flask.Response("success", mimetype='text/plain')

from methods.create_playlist import create_playlist
@app.route("/create-playlist/")
def create_playlist_wrapper():
    name = flask.request.args.get('name')
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

    return flask.Response("success", mimetype='text/plain')

from methods.add_user_to_playlist import add_user_to_playlist
@app.route("/add-user-to-playlist/")
def add_user_to_playlist_wrapper():
    username = flask.request.args.get('username')
    playlist_id = flask.request.args.get('playlist_id')

    return add_user_to_playlist(username, playlist_id)


def main(port=5000) -> None:
    global connection
    print("\n\n\n")

    os.environ["DB_PATH"] = DATABASE_PATH

    connection = sqlite3.connect(DATABASE_PATH)
    cursor = connection.cursor()
    cursor.execute("CREATE TABLE IF NOT EXISTS Users(UserID INTEGER PRIMARY KEY, Username TEXT, Password TEXT)")
    cursor.execute("CREATE TABLE IF NOT EXISTS Playlists(PlaylistID INTEGER PRIMARY KEY, PlaylistName TEXT)")
    cursor.execute("CREATE TABLE IF NOT EXISTS UserPlaylist(UserPlaylistID INTEGER PRIMARY KEY, PlaylistID INTEGER, UsernameID INTEGER)")
    connection.commit()
    connection.close()

    app.run(port=port)

if __name__ == "__main__":
    main()