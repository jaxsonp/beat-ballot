import os
from flask import Response, make_response, jsonify
import sqlite3

def search_song(spotify, track_name: str) -> Response:
    print(f"Attempting to get songs named \"{track_name}\"")

    response = spotify.search(q=f"track: {track_name}", limit=10, type='track')
    data = response['tracks']

    return make_response(jsonify({
        "message": "success",
        "data": data,
    }), 200)



