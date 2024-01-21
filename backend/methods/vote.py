import os
import flask
import sqlite3

def vote(spotify, session_token, playlistid: int, track_uri: str, yesno: int) -> flask.Response:

    print(f'Attempting to add vote \"{yesno}\" to song \"{track_uri}\" in playlist \"{playlist_uri}\"')
    connection = sqlite3.connect(os.environ["DB_PATH"])
    cursor = connection.cursor()

    user_id = cursor.execute(f"SELECT UserID FROM Sessions where Token  = \"{session_token}\";").fetchone[0]
    playlist_uri = cursor.execute(f'SELECT PlaylistURI FROM Playlists WHERE PlaylistID=\'{playlistid}\'').fetchone[0]

    votes = cursor.execute(f'SELECT * FROM Votes WHERE PlaylistURI = \'{playlist_uri}\' AND TrackURI = \'{track_uri}\'').fetchall()
    connection.commit()

    users = cursor.execute(f'SELECT * FROM UserPlaylist WHERE PlaylistID = {playlistid}').fetchall()

    if len(votes) < (len(users) - 1):
        cursor.execute(f'INSERT INTO Votes VALUES ({playlist_uri}, \'{track_uri}\', {user_id}, {yesno})')
        cursor.commit()
        print("vote added to db")

    else:
        yes = 0
        no = 0
        for i in range(len(votes) - 1):
            if (votes[i][3] == 0):
                yes += 1
            else:
                no += 1

        if (yesno == 0):
            yes += 1
        else:
            no += 1

        if (yes > no):
            spotify.playlist_add_items(playlist_id=playlist_uri, items=[track_uri], position=None)
            print("song added to playlist")
        else:
            cursor.execute(f'DELETE FROM Votes WHERE PlaylistID = \'{playlist_uri}\' AND TrackURI = \'{track_uri}\'')
            cursor.commit()
            print("song not added/votes deleted")

    cursor.close()
    return flask.Response("success", status=200, mimetype="text/plain")



