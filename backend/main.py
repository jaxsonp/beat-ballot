
import flask


app = flask.Flask(__name__)


@app.route("/")
def hello_world():
    return "<h1>Base route</h1>"

from methods.create_account import create_account
@app.route("/create-account/")
def create_account_wrapper():
    create_account()
    return flask.Response("success", mimetype='text/plain')



def main(port=5000) -> None:
    print("\n\n\n")


    app.run(port=port)

if __name__ == "__main__":
    main()