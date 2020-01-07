from flask import Flask
from flask import request
import flask
import collections
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://moderator:test12345678@localhost/socialsentiment'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app)

import models

@app.route('/post', methods=["GET", "POST"])
def post():
    if request.method == 'POST':
        body = flask.request.json
        post = models.Post(title=body.get('title'), content=body.get('content'),
                           user=models.User.query.filter_by(username=body.get('author')).first(), )
        db.session.add(post)
        db.session.commit()
    return flask.json.dumps([p.serialize for p in models.Post.newest(5)])


@app.route('/user', methods=["GET", "POST"])
def user():
    if request.method == 'POST':
        body = flask.request.json
        user = models.User(username=body.get('username'), email=body.get('email'), )
        db.session.add(user)
        db.session.commit()
    return flask.json.dumps([p.serialize for p in models.User.newest(5)])


if __name__ == '__main__':
    app.run()
