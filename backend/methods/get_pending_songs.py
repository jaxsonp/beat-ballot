import os
from flask import Response, make_response, jsonify
import sqlite3

def get_pending_songs(playlist_id: int, spotify) -> Response:

    print(f"Attempting to get pending songs from playlist \"{playlist_id}\"")

    connection = sqlite3.connect(os.environ["DB_PATH"])
    cursor = connection.cursor()
    playlist_uri = cursor.execute(f"SELECT PlaylistURI FROM Playlists WHERE PlaylistID = \"{playlist_id}\";").fetchone()[0]
    pending_songs = cursor.execute(f'SELECT DISTINCT TrackURI FROM Votes WHERE PlaylistURI = \'{playlist_uri}\';').fetchall()
    connection.commit()

    data = []
    for track_uri in pending_songs:
        track_uri = track_uri[0]
        info = spotify.track(track_uri)

        total_users = cursor.execute(f'SELECT * FROM UserPlaylist WHERE PlaylistID = {playlist_id};').fetchall()
        total_votes = cursor.execute(f'SELECT UserID FROM Votes WHERE PlaylistURI = \'{playlist_uri}\' AND TrackURI = \'{track_uri}\';').fetchall()
        yes = cursor.execute(f'SELECT UserID FROM (SELECT * FROM Votes WHERE PlaylistURI = \'{playlist_uri}\' AND TrackURI = \'{track_uri}\') WHERE YesNo == 1;').fetchall()
        data.append({"info": info, "ratio": len(yes)/len(total_users), "total-votes": len(total_votes)})

    connection.commit()
    connection.close()

    return make_response(jsonify({
        "message": "success",
        "data": data,
    }), 200)





