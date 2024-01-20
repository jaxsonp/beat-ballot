import os
import time
import secrets
from flask import Response, jsonify, make_response
import sqlite3

def sign_in(username: str, pass_hash: str) -> Response:
    if username == None:
        return Response(jsonify({"text": "No username provided"}), status=400)
    elif pass_hash == None:
        return Response(jsonify({"text": "No password provided"}), status=400)

    print(f"Attempting to sign in user \"{username}\"")
    connection = sqlite3.connect(os.environ["DB_PATH"])
    cursor = connection.cursor()

    result = cursor.execute(f"SELECT UserID, Password FROM Users where Username == \"{username}\";")
    result = result.fetchone()

    if result == None:
        connection.commit()
        connection.close()
        print("Couldn't find user")
        return make_response(jsonify({ "message": f"Could not find user with name \"{username}\"" }), 400)

    id, stored_pass_hash = result

    # checking password
    if pass_hash != stored_pass_hash:
        connection.commit()
        connection.close()
        print("Incorrect password")
        return make_response(jsonify({ "message": "Incorrect password" }), 400)

    # clearing old sessions
    cursor.execute(f"DELETE FROM Sessions WHERE UserID=\"{id}\";")

    # creating session token
    token = secrets.token_urlsafe(16)
    timestamp = int(time.time())
    cursor.execute(f"INSERT INTO Sessions (UserID, Token, LastUsedTimestamp) VALUES ({id}, \"{token}\", {timestamp});")
    print(f"INSERT INTO Sessions (UserID, Token, LastUsedTimestamp) VALUES ({id}, \"{token}\", {timestamp});")

    connection.commit()
    connection.close()
    response_data = {
        "message": "success",
        "session-token": token,
        "username": username
    }
    return jsonify(response_data)