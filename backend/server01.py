# Import flask and datetime module for showing date and time
from flask import Flask
import flask
import datetime

x = datetime.datetime.now()
app = Flask(__name__)


# def create_app():
# 	#Initializing flask app
# 	app.config.from_object("settings")


# Route for seeing a data
@app.route('/data')
def get_time():
    # Returning an api for showing in reactjs
    return {
        'Name': "VoiceRecognizing",
        "Age": "LINEAR16",
        "Date": x,
        "programming": "default"
    }


@app.route('/')
def favicon():
    resp = flask.Response("Undefined")
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp


# return '<link rel="icon" href="../frontend/src/logo.svg">'


# Running app
if __name__ == '__main__':
    # app = create_app()
    # port = app.config.get("PORT", 5000)
    app.run(host="127.0.0.1", port=5000)
