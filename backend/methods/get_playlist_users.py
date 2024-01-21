import os
from flask import Response, make_response, jsonify
import sqlite3

def get_playlist_users(playlist_id: int) -> Response:

    if playlist_id == -1:
        return make_response(jsonify({
            "message": "invalid playlist ID"
        }), 400)

    connection = sqlite3.connect(os.environ["DB_PATH"])
    cursor = connection.cursor()

    user_ids = cursor.execute(f"SELECT UserID FROM UserPlaylist WHERE PlaylistID=\"{playlist_id}\";").fetchall()
    usernames = []
    for id in user_ids:
        usernames.append(cursor.execute(f"SELECT Username FROM Users WHERE UserID=\"{id[0]}\";").fetchone()[0])

    connection.commit()
    connection.close()
    return make_response(jsonify({
        "message": "success",
        "users": usernames
    }), 200)
