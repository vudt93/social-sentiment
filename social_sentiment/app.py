from flask import render_template

from social_sentiment.views.PostView import *
from social_sentiment.views.UserView import *
from social_sentiment.views.LoginView import *


@app.route('/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run()
