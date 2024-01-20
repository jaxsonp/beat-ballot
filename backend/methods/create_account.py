import sqlite3

def create_account() -> Flask.Response:
    #print("creating account")
    username = request.form.get('username')
    password = request.form.get('password')

    connection = sqlite3.connect(os.environ["DB_PATH"])
    cursor = connection.cursor()
    result = cursor.execute("SELECT * FROM Users WHERE Username = ?", username)
    if not result:
        result = cursor.execute("INSERT INTO Users\nVALUES (?, ?);", username, password)
        connection.commit()
    else:
        connection.close()
        return Flask.Response("Username Taken", status=400, mimetype="text/plain")

    return Flask.Response("Account Created", status=200, mimetype="text/plain")
