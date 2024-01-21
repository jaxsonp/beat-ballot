import os
from flask import Response, make_response, jsonify
import sqlite3

def get_pending_songs(playlist_id: int) -> Response:
    
    print(f"Attempting to get pending songs from playlist \"{playlist_id}\"")

    connection = sqlite3.connect(os.environ["DB_PATH"])
    cursor = connection.cursor()

    pending_songs = cursor.execute(f'SELECT DISTICT TrackURI FROM Votes WHERE Playlist = \'spotify:playlist:{playlist_id}\'').fetchall()
    connection.commit()

    data = []
    for track_uri in pending_songs:
        info = spotify.track(track_uri)

        total_users = cursor.execute(f'SELECT * FROM UserPlaylist WHERE PlaylistID = {playlist_id}').fetchall()
        total_votes = cursor.execute(f'SELECT UserID FROM Votes WHERE PlaylistURI = \'spotify:playlist:{playlist_id} AND TrackURI = \'{track_uri}\'').fetchall()
        yes = cursor.execute(f'SELECT UserID FROM (SELECT * FROM Votes WHERE PlaylistURI = \'spotify:playlist:{playlist_id} AND TrackURI = \'{track_uri}\') WHERE YesNo == 1').fetchall()
        data.append((info, len(yes)/len(total_users), len(total_votes)))

    connection.commit()
    connection.close()

    return make_response(jsonify({
        "message": "success",
        "data": data,
    }), 200)





