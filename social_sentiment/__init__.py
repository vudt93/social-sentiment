from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from flask_cors import CORS

app = Flask(__name__,
            static_folder = '../frontend/build/static',
            template_folder="../frontend/build"
            )
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://moderator:test12345678@localhost/socialsentiment'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app)

from social_sentiment import models