
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
@app.route("/create-account/")
def create_account_wrapper():
    create_account(connection)
    """cursor = connection.cursor()
    result = cursor.execute("INSERT INTO Users\nVALUES (test_user, password1);")
    connection.commit()"""
    return flask.Response("success", mimetype='text/plain')

from methods.create_playlist import create_playlist
@app.route("/create-playlist/")
def create_playlist_wrapper():
    create_playlist()
    return flask.Response("success", mimetype='text/plain')


def main(port=5000) -> None:
    global connection
    print("\n\n\n")

    os.environ["DB_PATH"] = DATABASE_PATH

    connection = sqlite3.connect(DATABASE_PATH)
    cursor = connection.cursor()
    cursor.execute("CREATE TABLE IF NOT EXISTS Users(username, password)")
    cursor.execute("CREATE TABLE IF NOT EXISTS Playlists(playlist_id, playlist_name)")
    cursor.execute("CREATE TABLE IF NOT EXISTS UserPlaylist(user_playlist_id, playlist_id, username)")
    connection.commit()
    connection.close()

    app.run(port=port)

if __name__ == "__main__":
    main()