import os
from flask import Response, jsonify, make_response
import sqlite3

def add_user_to_playlist(username: str, playlist_id: int) -> Response:

    print(f"Attempting to add user \"{username}\" to playlist \"{playlist_id}\"")
    connection = sqlite3.connect(os.environ["DB_PATH"])
    cursor = connection.cursor()

    result = cursor.execute(f"SELECT UserID FROM Users where Username == \"{username}\";")
    user_id = result.fetchone()
    connection.commit()
    if user_id == None:
        connection.close()
        return make_response(jsonify({ "message": f"Could not find user with name \"{username}\"" }), 400)
    else:
        cursor.execute(f'INSERT INTO UserPlaylist (PlaylistID, UserID) VALUES (\'{playlist_id}\', \'{user_id[0]}\')')
        connection.commit()

    connection.close()
    return make_response(jsonify({ "message": "success" }), 200)