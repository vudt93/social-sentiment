from flask import request, Response, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from social_sentiment import app, models, db
from social_sentiment.sentiment_analyzer.NaiveBayesSentimentAnalyzer import NaiveBayesSentimentAnalyzer

analyzer = NaiveBayesSentimentAnalyzer()


@app.route('/api/post', methods=["GET"])
@jwt_required
def get_post_list():
    post_lst = models.Post.newest(5)
    return jsonify(list(map(lambda p: p.serialize, post_lst)))


@app.route('/api/post/<post_id>/', methods=["PUT"])
@jwt_required
def update_post(post_id):
    post = models.Post.query.filter_by(id=post_id).first()
    body = request.get_json()
    post.title = body.get('title')
    post.content = body.get('content')
    post.sentiment_score = analyzer.calculate_sentiment(body.get('content'))
    post.user = models.User.query.filter_by(username=body.get('author')).first()
    db.session.commit()
    return jsonify(post.serialize)


@app.route('/api/post', methods=["POST"])
@jwt_required
def create_post():
    if request.method == 'POST':
        body = request.get_json()
        post = models.Post(title=body.get('title'), content=body.get('content'),
                           user=models.User.query.filter_by(username=get_jwt_identity()).first(),
                           sentiment_score=analyzer.calculate_sentiment(body.get('content')))
        db.session.add(post)
        db.session.flush()
        db.session.commit()
        #post = models.Post.query.filter_by(id=post.id).first()
    return jsonify(post.serialize)


@app.route('/api/post/<post_id>/', methods=["DELETE"])
@jwt_required
def delete_post(post_id):
    post = models.Post.query.filter_by(id=post_id).first()
    db.session.remove(post)
    db.session.commit()
    return Response(response="SUCCESS", status=200)
