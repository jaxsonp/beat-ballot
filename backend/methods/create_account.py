import os
import time
import secrets
import sqlite3
from flask import Response, jsonify, make_response

def create_account(username: str, pass_hash: str) -> Response:
    print(f"Attempting to create account \"{username}\"...", end="")
    connection = sqlite3.connect(os.environ["DB_PATH"])
    cursor = connection.cursor()

    # checking if username is taken
    result = cursor.execute(f"SELECT * FROM Users WHERE Username=\"{username}\"").fetchone()
    if result != None:
        connection.commit()
        connection.close()
        print("Failed, username taken")
        return make_response(jsonify({ "message": "Username already exists" }), 400)

    # creating user
    cursor.execute(f"INSERT INTO Users (Username, Password) VALUES (\"{username}\", \"{pass_hash}\");")
    user_id = cursor.execute(f"SELECT UserID FROM Users WHERE Username=\"{username}\";").fetchone()[0]

    # creating session token
    token = secrets.token_urlsafe(16)
    timestamp = int(time.time())
    cursor.execute(f"INSERT INTO Sessions (UserID, Token, LastUsedTimestamp) VALUES ({user_id}, \"{token}\", {timestamp});")

    print("success")
    connection.commit()
    connection.close()
    response_data = {
        "message": "success",
        "session-token": token,
        "username": username
    }
    return jsonify(response_data)
