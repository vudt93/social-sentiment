import datetime
from functools import wraps

import flask
import jwt
from flask_jwt_extended import (
    JWTManager, create_access_token,
    jwt_refresh_token_required, create_refresh_token,
    get_jwt_identity
)

from flask import Response
from flask import request

from social_sentiment import app, models

app.config['JWT_SECRET_KEY'] = 'ABCD'
jwt = JWTManager(app)



def token_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        token = request.headers.get('Authorization')
        try:
            if token is None or token[:7] != 'Bearer ':
                raise Exception('Not exist token')
            token = token[7:]
            jwt.decode(token, app.config['SECRET_KEY'])
            return f(*args, **kwargs)
        except Exception as e:
            print(e)
            return flask.json.jsonify({'error': str(e)}), 401
    return wrapper


@app.route('/authentication', methods=["POST"])
def get_token():
    body = request.get_json()
    username = body.get('username')
    if models.User.username_password_match(username, body.get('password')):
        return flask.json.jsonify({
                'access': create_access_token(identity=username),
                'refresh': create_refresh_token(identity=username)
            }), 200
    else:
        return Response('', 401, mimetype='application/json')


@app.route('/refreshToken', methods=['OPTIONS', 'POST'])
#@jwt_refresh_token_required
def refresh():
    current_user = get_jwt_identity()
    ret = {
        'access': create_access_token(identity=current_user)
    }
    return flask.json.jsonify(ret), 200