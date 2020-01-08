import datetime
from functools import wraps

from flask import request, Response
import flask

from social_sentiment import models, db, app
import jwt

app.config['SECRET_KEY'] = 'ABCD'


def token_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        token = request.args.get('token')
        try:
            jwt.decode(token, app.config['SECRET_KEY'])
            return f(*args, **kwargs)
        except Exception as e:
            print(e)
            return flask.json.jsonify({'error': 'Need valid token'}), 401
    return wrapper


@app.route('/login')
def get_token():
    body = request.get_json()
    if models.User.username_password_match(body.get('username'), body.get('password')):
        token = jwt.encode({
            'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=1000)
        }, app.config['SECRET_KEY'], algorithm='HS256'
        )
        return token
    else:
        return Response('', 401, mimetype='application/json')


@app.route('/post/<post_id>', methods=["GET", "POST"])
@token_required
def post(post_id):
    post = models.Post.query.filter_by(id=post_id).first()
    if request.method == 'POST':
        body = request.get_json()
        post.title = body.get('title')
        post.content = body.get('content')
        post.user = models.User.query.filter_by(username=body.get('author')).first()
        db.session.commit()
    return flask.json.dumps(post.serialize)


@app.route('/post', methods=["GET", "POST"])
@token_required
def create_post():
    if request.method == 'POST':
        body = request.get_json()
        post = models.Post(title=body.get('title'), content=body.get('content'),
                           user=models.User.query.filter_by(username=body.get('author')).first(), )
        db.session.add(post)
        db.session.commit()
    return flask.json.dumps([p.serialize for p in models.Post.newest(5)])


@app.route('/user/<username>', methods=["GET", "POST"])
@token_required
def user(username):
    user = models.User.query.filter_by(username=username).first()
    if request.method == 'POST':
        body = request.get_json()
        user.username = body.get('username')
        user.email = body.get('email')
        db.session.commit()
    return flask.json.dumps(user.serialize)


@app.route('/user', methods=["GET", "POST"])
@token_required
def create_user():
    if request.method == 'POST':
        body = request.get_json()
        user = models.User(username=body.get('username'), email=body.get('email'), password=body.get('password'), )
        db.session.add(user)
        db.session.commit()
    return flask.json.dumps([p.serialize for p in models.User.newest(5)])


if __name__ == '__main__':
    app.run()
