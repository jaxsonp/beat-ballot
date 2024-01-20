import os
from flask import Response, make_response, jsonify
import sqlite3

def get_playlists(session_token: str) -> Response:

    connection = sqlite3.connect(os.environ["DB_PATH"])
    cursor = connection.cursor()

    id = cursor.execute(f"SELECT UserID FROM Sessions WHERE Token=\"{session_token}\";").fetchone()
    result = cursor.execute(f"SELECT PlaylistID, Playlist FROM UserPlaylist WHERE UserID=\"{id}\";").fetchone()
    print(result)
    connection.commit()
    connection.close()
    return make_response(jsonify({ "message": "..." }), 200)
