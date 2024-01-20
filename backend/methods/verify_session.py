import os
import time
import sqlite3

def verify_session(token: str) -> bool:
    print(f"Verifying session ({token})... ", end="")
    connection = sqlite3.connect(os.environ["DB_PATH"])
    cursor = connection.cursor()
    result = cursor.execute(f"SELECT UserID, LastUsedTimestamp FROM Sessions where Token == \"{token}\";").fetchone()
    if result == None:
        print("Couldn't find session")
        return False

    id, last_used_timestamp = result
    if last_used_timestamp < int(time.time()) - int(os.environ["SESSION_TIMEOUT_LEN"]):
        print("Session expired")
        return False

    print("Session is valid")
    return True