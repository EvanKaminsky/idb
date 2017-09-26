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


# Sample App HTML, as provided by GCP Flask + App Engine #

# Request handler that displays a form using the form.html template
@app.route('/form')
def form():
    return render_template('form.html')


# Request handler that handles the information from the submitted form
@app.route('/submitted', methods=['POST'])
def submitted_form():
    name = request.form['name']
    email = request.form['email']
    site = request.form['site_url']
    comments = request.form['comments']
    return render_template('submitted_form.html', name=name, email=email, site=site, comments=comments)


