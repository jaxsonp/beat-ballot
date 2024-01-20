
import flask
import sqlite3

DATABASE_PATH = "./database.db"

app = flask.Flask(__name__)
connection = None

@app.route("/")
def hello_world():
    return "<h1>Base route</h1>"

from methods.create_account import create_account
@app.route("/create-account/", methods=['POST'])
def create_account_wrapper():
    create_account(connection)
    """cursor = connection.cursor()
    result = cursor.execute("INSERT INTO Users\nVALUES (test_user, password1);")
    connection.commit()"""
    return flask.Response("success", mimetype='text/plain')



def main(port=5000) -> None:
    global connection
    print("\n\n\n")

    connection = sqlite3.connect("User.db")
    cursor = connection.cursor()
    cursor.execute("CREATE TABLE IF NOT EXISTS Users(username, password)")
    cursor.execute("CREATE TABLE IF NOT EXISTS Playlists(playlist_id, playlist_name)")
    cursor.execute("CREATE TABLE IF NOT EXISTS UserPlaylist(user_playlist_id, playlist_id, username)")

    app.run(port=port)

if __name__ == "__main__":
    main()