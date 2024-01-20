import os
import sqlite3

def create_playlist():
    connection = sqlite3.connect(os.environ["DB_PATH"])
    cursor = connection.cursor()
    result = cursor.execute("INSERT INTO Playlists\nVALUES ('test_user', 'password1');")
    connection.commit()
    connection.close()
    return