import os
import flask
import sqlite3

def create_playlist(name: str) -> flask.Response:
    if name == None:
        flask.Response("No name provided", status=400, mimetype='text/plain')

    print(f"Creating playlist \"{name}\"")
    connection = sqlite3.connect(os.environ["DB_PATH"])
    cursor = connection.cursor()
    result = cursor.execute(f"INSERT INTO Playlists (PlaylistName)\nVALUES (\"{name}\");")
    connection.commit()
    connection.close()
    return flask.Response("success", status=200, mimetype='text/plain')