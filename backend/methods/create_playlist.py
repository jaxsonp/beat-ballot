import os
from flask import Response, make_response, jsonify
import sqlite3

def create_playlist(name: str) -> Response:
    if name == None:
        return make_response(jsonify({ "message": "No name provided" }), 400)

    print(f"Creating playlist \"{name}\"")
    connection = sqlite3.connect(os.environ["DB_PATH"])
    cursor = connection.cursor()
    result = cursor.execute(f"INSERT INTO Playlists (PlaylistName)\nVALUES (\"{name}\");")
    connection.commit()
    connection.close()

    return make_response(jsonify({ "message": "success" }), 200)