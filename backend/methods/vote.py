import os
import flask
import sqlite3

def vote(playlist_id: str, track_uri: str, yesno: int) -> flask.Response:
    if playlist_id == None:
        return flask.Response("No playlist ID provided", status=400, mimetype='text/plain')
    elif song_uri == None:
        return flask.Response("No song uri provided", status=400, mimetype='text/plain')

    print(f'Attempting to add vote \"{yesno}\" to song \"{song_uri}\" in playlist \"{playlist_id}\"')
    connection = sqlite3.connect(os.environ["DB_PATH"])
    cursor = connection.cursor()

    votes = cursor.execute(f'SELECT * FROM Votes WHERE PlaylistID = \'{playlist_id}\' AND TrackURI = \'{track_uri}\'').fetchall()
    connect.commit()

    if len(votes) < (len(get_playlist_users(playlist_id)) - 1):
        cursor.execute(f'INSERT INTO Votes VALUES ({playlist_id}, \'{track_uri}\', {user_id}, {yesno})')
        cursor.commit()
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
            cursor

