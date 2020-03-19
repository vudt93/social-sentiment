import flask
from flask import request
from flask_jwt_extended import jwt_required

from social_sentiment import app, models, db


@app.route('/api/user/<username>', methods=["GET", "POST"])
@jwt_required
def user(username):
    user = models.User.query.filter_by(username=username).first()
    if request.method == 'POST':
        body = request.get_json()
        user.username = body.get('username')
        user.email = body.get('email')
        db.session.commit()
    return flask.json.dumps(user.serialize)


@app.route('/api/user', methods=["GET", "POST"])
@jwt_required
def create_user():
    if request.method == 'POST':
        body = request.get_json()
        user = models.User(username=body.get('username'), email=body.get('email'), password=body.get('password'), )
        db.session.add(user)
        db.session.commit()
    return flask.json.dumps([p.serialize for p in models.User.newest(5)])
