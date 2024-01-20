import os
from flask import Response, jsonify
import sqlite3

def sign_in(username: str, pass_hash: str) -> Response:
    if username == None:
        return Response("No username provided", status=400, mimetype='text/plain')
    elif pass_hash == None:
        return Response("No password provided", status=400, mimetype='text/plain')

    print(f"Attempting to sign in user \"{username}\"")
    connection = sqlite3.connect(os.environ["DB_PATH"])
    cursor = connection.cursor()

    result = cursor.execute(f"SELECT UserID, Password FROM Users where Username == \"{username}\";")
    result = result.fetchone()
    print(result)
    """if result == None:
        connection.commit()
        connection.close()
        return Response(f"Could not find user with name \"{username}\"", status=400, mimetype='text/plain')"""

    connection.commit()
    connection.close()
    response = {
        "token": "abcde"
    }
    return jsonify(response)