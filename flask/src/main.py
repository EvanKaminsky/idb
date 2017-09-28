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


from flask import Flask, render_template, request

# Create an instance of the Flask class and assign it to a variable called app
app = Flask(__name__)


# Search Views #

@app.route('/')
@app.route('/index.html')
def default():
    return render_template('index.html')


@app.route('/brands.html')
def brands():
    return render_template('brands.html')


@app.route('/cocktails.html')
def cocktails():
    return render_template('cocktails.html')


@app.route('/countries.html')
def countries():
    return render_template('countries.html')


@app.route('/ingredients.html')
def ingredients():
    return render_template('ingredients.html')


@app.route('/about.html')
def about():
    return render_template('about.html')


# Individual Views #

@app.route('/brands/<name>')
def brand(name):
    return render_template('/brands/' + name)


@app.route('/cocktails/<name>')
def cocktail(name):
    print('/cocktails/' + name + '.html')
    return render_template('/cocktails/' + name)


@app.route('/ingredients/<name>')
def ingredient(name):
    return render_template('/ingredients/' + name)


@app.route('/countries/<name>')
def country(name):
    return render_template('/countries/' + name)

