import os
from flask import Response, make_response, jsonify
import sqlite3

def get_playlists(session_token: str) -> Response:

    connection = sqlite3.connect(os.environ["DB_PATH"])
    cursor = connection.cursor()

    user_id = cursor.execute(f"SELECT UserID FROM Sessions WHERE Token=\"{session_token}\";").fetchone()[0]

    playlist_ids = [a[0] for a in cursor.execute(f"SELECT PlaylistID FROM UserPlaylist WHERE UserID=\"{user_id}\";").fetchall()]
    playlists = []
    for playlist_id in playlist_ids:
        name = cursor.execute(f"SELECT PlaylistName FROM Playlists WHERE PlaylistID=\"{playlist_id}\";").fetchone()[0]
        playlists.append({
            "name": name,
            "id": playlist_id
        })

    print(playlists)
    connection.commit()
    connection.close()
    return make_response(jsonify({
        "message": "...",
        "playlists": playlists,
    }), 200)
