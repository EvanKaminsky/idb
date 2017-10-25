"""
When App Engine receives a web request for your application, it calls the handler script that corresponds to the URL,
as described in the application's app.yaml configuration file. The Python 2.7 runtime supports the WSGI standard.
WSGI is preferred, and some features of Python 2.7 do not work without it. The configuration of your application's
script handlers determines whether a request is handled using WSGI.

The server determines which Python application object to call by comparing the URL of the request to the URL patterns
in the app's configuration file. It then calls the application object using the arguments as defined in the WSGI
standard. The application object performs actions appropriate to the request, then prepares a response and returns
it as a list of strings.
"""

from flask import Flask, render_template
app = Flask(__name__, template_folder="frontend/templates",  static_folder="frontend/static")

@app.route('/')
def react():
    return render_template("index.html")

if __name__ == '__main__':
    app.run(debug=True)


