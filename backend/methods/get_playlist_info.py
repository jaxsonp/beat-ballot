import os
from flask import Response, make_response, jsonify
import sqlite3

def get_playlist_info(playlist_id: int) -> Response:

    if playlist_id == -1:
        return make_response(jsonify({
            "message": "invalid playlist ID"
        }), 400)

    connection = sqlite3.connect(os.environ["DB_PATH"])
    cursor = connection.cursor()

    name, id = cursor.execute(f"SELECT PlaylistName, PlaylistID FROM Playlists WHERE PlaylistID=\"{playlist_id}\";").fetchone()

    connection.commit()
    connection.close()
    return make_response(jsonify({
        "message": "success",
        "info": {
            "name": name,
            "info": id,
        },
    }), 200)
