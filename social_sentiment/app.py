from flask import request
import flask

from social_sentiment import models, db, app


@app.route('/post', methods=["GET", "POST"])
def post():
    if request.method == 'POST':
        body = flask.request.json
        post = models.Post(title=body.get('title'), content=body.get('content'),
                           user=models.User.query.filter_by(username=body.get('author')).first(), )
        db.session.add(post)
        db.session.commit()
    return flask.json.dumps([p.serialize for p in models.Post.newest(5)])


@app.route('/post/<post_id>', methods=["GET", "POST"])
def post(post_id):
    post = models.Post.query.filter_by(id=post_id).first()
    if request.method == 'POST':
        body = flask.request.json
        post.title = body.get('title')
        post.content = body.get('content')
        post.user = models.User.query.filter_by(username=body.get('author')).first()
        db.session.commit()
    return flask.json.dumps(user.serialize)


@app.route('/user', methods=["GET", "POST"])
def user():
    if request.method == 'POST':
        body = flask.request.json
        user = models.User(username=body.get('username'), email=body.get('email'), )
        db.session.add(user)
        db.session.commit()
    return flask.json.dumps([p.serialize for p in models.User.newest(5)])


@app.route('/user/<username>', methods=["GET", "POST"])
def post(username):
    user = models.User.query.filter_by(username=username).first()
    if request.method == 'POST':
        body = flask.request.json
        user.username = body.get('username')
        user.email = body.get('email')
        db.session.commit()
    return flask.json.dumps(user.serialize)


if __name__ == '__main__':
    app.run()
