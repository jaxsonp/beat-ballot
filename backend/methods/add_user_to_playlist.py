import os
import flask
import sqlite3

def add_user_to_playlist(username: str, playlist_id: str) -> flask.Response:
    if username == None:
        return flask.Response("No username provided", status=400, mimetype='text/plain')
    elif playlist_id == None:
        return flask.Response("No playlist ID provided", status=400, mimetype='text/plain')

    print(f"Attempting to add user \"{username}\" to playlist \"{playlist_id}\"")
    connection = sqlite3.connect(os.environ["DB_PATH"])
    cursor = connection.cursor()

    result = cursor.execute(f"SELECT UserID FROM Users where Username == \"{username}\";")
    user_id = result.fetchone()
    if user_id == None:
        connection.commit()
        connection.close()
        return flask.Response(f"Could not find user with name \"{username}\"", status=400, mimetype='text/plain')


    connection.commit()
    connection.close()
    return flask.Response("success", status=200, mimetype="text/plain")