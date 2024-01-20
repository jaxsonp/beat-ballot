
from flask import Flask


app = Flask(__name__)


@app.route("/")
def hello_world():
    return "<h1>Base route</h1>"

@app.route("/vote/")
def hello_world():
    return "<h1>Testing!</h1>"



def main(port=5000) -> None:
    print("\n\n\n")


    app.run(port=port)

if __name__ == "__main__":
    main()