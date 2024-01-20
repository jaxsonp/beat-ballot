import os
import flask
import sqlite3

def sign_in(username: str, pass_hash: str) -> flask.Response:
    if username == None:
        return flask.Response("No username provided", status=400, mimetype='text/plain')
    elif pass_hash == None:
        return flask.Response("No password provided", status=400, mimetype='text/plain')

    print(f"Attempting to sign in user \"{username}\"")
    connection = sqlite3.connect(os.environ["DB_PATH"])
    cursor = connection.cursor()

    result = cursor.execute(f"SELECT UserID, Password FROM Users where Username == \"{username}\";")
    user_id, password = result.fetchone()
    if user_id == None:
        connection.commit()
        connection.close()
        return flask.Response(f"Could not find user with name \"{username}\"", status=400, mimetype='text/plain')

    print(user_id, password)
    connection.commit()
    connection.close()
    return flask.Response("success", status=200, mimetype='text/plain')