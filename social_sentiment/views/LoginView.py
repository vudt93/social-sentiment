import datetime
from functools import wraps

import flask
import jwt
from flask import Response
from flask import request
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    get_jwt_identity
)

from social_sentiment import app
from social_sentiment.models import User

refresh_expr = datetime.timedelta(days=1)
access_expr = datetime.timedelta(hours=1)

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
    user = User.get_user(username)
    if user is None:
        return Response('Username is not existed', 401, mimetype='application/json')

    authorized = user.check_password(body.get('password'))
    if authorized:
        return flask.json.jsonify({
                'access': create_access_token(identity=username,  expires_delta=access_expr),
                'refresh': create_refresh_token(identity=username,  expires_delta=refresh_expr)
            }), 200
    else:
        return Response('Username or password invalid', 401, mimetype='application/json')


@app.route('/refreshToken', methods=['OPTIONS', 'POST'])
def refresh():
    current_user = get_jwt_identity()
    ret = {
        'access': create_access_token(identity=current_user,  expires_delta=access_expr)
    }
    return flask.json.jsonify(ret), 200