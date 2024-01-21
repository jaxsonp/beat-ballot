import os
import flask
import sqlite3

def vote(spotify, playlistid: int, playlist_uri: str, track_uri: str, user_id: int, yesno: int) -> flask.Response:
    if playlist_uri == None:
        return flask.Response("No playlist ID provided", status=400, mimetype='text/plain')
    elif track_uri == None:
        return flask.Response("No song uri provided", status=400, mimetype='text/plain')

    print(f'Attempting to add vote \"{yesno}\" to song \"{song_uri}\" in playlist \"{playlist_uri}\"')
    connection = sqlite3.connect(os.environ["DB_PATH"])
    cursor = connection.cursor()

    votes = cursor.execute(f'SELECT * FROM Votes WHERE PlaylistID = \'{playlist_uri}\' AND TrackURI = \'{track_uri}\'').fetchall()
    connect.commit()

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

            

