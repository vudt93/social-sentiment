import datetime
from functools import wraps

import flask
import jwt
from flask import Response
from flask import request

from social_sentiment import app, models

app.config['SECRET_KEY'] = 'ABCD'


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
