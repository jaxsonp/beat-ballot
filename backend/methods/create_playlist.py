import os
from flask import Response, make_response, jsonify
import sqlite3

def create_playlist(name: str) -> Response:
    if name == None:
        return make_response(jsonify({ "message": "No name provided" }), 400)

    print(f"Creating playlist \"{name}\" ", end="")
    connection = sqlite3.connect(os.environ["DB_PATH"])
    cursor = connection.cursor()

    # verifying user
    # user_id = cursor.execute(f"SELECT UserID FROM Sessions WHERE Token=\"{name}\";").fetchone()[0]

    cursor.execute(f"INSERT INTO Playlists (PlaylistName)\nVALUES (\"{name}\");")
    #playlist_id = cursor.execute(f"SELECT PlaylistID FROM Playlists WHERE PlaylistName=\"{name}\";").fetchone()[0]
    #cursor.execute(f"INSERT INTO UserPlaylist (PlaylistName)\nVALUES (\"{name}\");")
    #print(f"success (id {playlist_id})")
    print("success")
    connection.commit()
    connection.close()

    return make_response(jsonify({ "message": "success" }), 200)