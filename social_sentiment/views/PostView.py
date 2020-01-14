import flask
from flask import request

from social_sentiment import app, models, db
from social_sentiment.views.LoginView import token_required
from social_sentiment.sentiment_analyzer.NaiveBayesSentimentAnalyzer import calculate_sentiment


@app.route('/post/<post_id>', methods=["GET", "POST"])
@token_required
def post(post_id):
    post = models.Post.query.filter_by(id=post_id).first()
    if request.method == 'POST':
        body = request.get_json()
        post.title = body.get('title')
        post.content = body.get('content')
        post.sentiment_score = calculate_sentiment(body.get('content'))
        post.user = models.User.query.filter_by(username=body.get('author')).first()
        db.session.commit()
    return flask.json.dumps(post.serialize)


@app.route('/post', methods=["GET", "POST"])
@token_required
def create_post():
    if request.method == 'POST':
        body = request.get_json()
        post = models.Post(title=body.get('title'), content=body.get('content'),
                           user=models.User.query.filter_by(username=body.get('author')).first(),
                           sentiment_score=calculate_sentiment(body.get('content')))
        db.session.add(post)
        db.session.commit()
    return flask.json.dumps([p.serialize for p in models.Post.newest(5)])