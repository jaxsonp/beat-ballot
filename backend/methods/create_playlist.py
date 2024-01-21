import os
from flask import Response, make_response, jsonify
import sqlite3

def create_playlist(spotify, session_token, playlist_name: str) -> Response:
    if playlist_name == None:
        return make_response(jsonify({ "message": "No name provided" }), 400)

    print(f"Creating playlist \"{name}\" ", end="")
    connection = sqlite3.connect(os.environ["DB_PATH"])
    cursor = connection.cursor()

    user_id = cursor.execute(f"SELECT UserID FROM Sessions where Token = \"{session_token}\";").fetchone()[0]
    connection.commit()

    result = spotify.user_playlist_create(USER_ID, playlist_name, public=True)
    playlist_uri = result["id"]


    cursor.execute(f"INSERT INTO Playlists \nVALUES (\'{playlist_uri}\');")

    playlist_id = cursor.execute(f"SELECT PlaylistID FROM Playlists WHERE PlaylistName=\"{name}\";").fetchone()[0]
    cursor.execute(f"INSERT INTO UserPlaylist (PlaylistID, UserID)\nVALUES (\"{playlist_id, user_id}\");")
    print(f"success (id {playlist_id})")

    connection.commit()
    connection.close()

    return make_response(jsonify({ "message": "success" }), 200)