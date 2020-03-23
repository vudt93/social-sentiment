from flask import request, jsonify, Response
from flask_jwt_extended import jwt_required

from social_sentiment import app, models, db


@app.route('/api/user', methods=["GET"])
@jwt_required
def get_user_list():
    user_lst = models.User.newest(5)
    return jsonify(list(map(lambda p: p.serialize, user_lst)))


@app.route('/api/user/<user_id>/', methods=["PUT"])
@jwt_required
def update_user(user_id):
    user = models.User.query.filter_by(id=user_id).first()
    body = request.get_json()
    user.username = body.get('username')
    user.email = body.get('email')
    db.session.commit()
    return jsonify(user.serialize)


@app.route('/api/user', methods=["POST"])
@jwt_required
def create_user():
    if request.method == 'POST':
        body = request.get_json()
        user = models.User(username=body.get('username'), email=body.get('email'), password=body.get('password'), )
        user.hash_password()
        db.session.add(user)
        db.session.flush()
        db.session.commit()
    return jsonify(user.serialize)


@app.route('/api/user/<user_name>/', methods=["DELETE"])
@jwt_required
def delete_user(user_name):
    user = models.User.query.filter_by(id=user_name).first()
    db.session.remove(user)
    db.session.commit()
    return Response(response="SUCCESS", status=200)
