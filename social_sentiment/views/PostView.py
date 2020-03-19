import flask
from flask import request
from flask_jwt_extended import jwt_required

from social_sentiment import app, models, db
from social_sentiment.sentiment_analyzer.NaiveBayesSentimentAnalyzer import NaiveBayesSentimentAnalyzer

analyzer = NaiveBayesSentimentAnalyzer()


@app.route('/api/post/', methods=["GET"])
@jwt_required
def get():
    post_lst = models.Post.query.all()
    return flask.json.dumps(list(map(lambda p: p.serialize, post_lst)))


@app.route('/api/post/<post_id>', methods=["POST"])
@jwt_required
def post(post_id):
    post = models.Post.query.filter_by(id=post_id).first()
    body = request.get_json()
    post.title = body.get('title')
    post.content = body.get('content')
    post.sentiment_score = analyzer.calculate_sentiment(body.get('content'))
    post.user = models.User.query.filter_by(username=body.get('author')).first()
    db.session.commit()
    return flask.json.dumps(post.serialize)


@app.route('/api/post', methods=["GET", "POST"])
@jwt_required
def create_post():
    if request.method == 'POST':
        body = request.get_json()
        post = models.Post(title=body.get('title'), content=body.get('content'),
                           user=models.User.query.filter_by(username=body.get('author')).first(),
                           sentiment_score=analyzer.calculate_sentiment(body.get('content')))
        db.session.add(post)
        db.session.commit()
    return flask.json.dumps([p.serialize for p in models.Post.newest(5)])