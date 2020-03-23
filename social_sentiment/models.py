from datetime import datetime
from sqlalchemy import desc
from social_sentiment import db
from flask_bcrypt import generate_password_hash, check_password_hash


class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(300), nullable=False)
    content = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow)
    sentiment_score = db.Column(db.Float, default=0)

    @staticmethod
    def newest(num):
        return Post.query.order_by(desc(Post.date)).limit(num).all()

    @property
    def serialize(self):
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'author': self.user.username,
            'sentiment_score': 'negative' if self.sentiment_score < 0 else 'positive' if self.sentiment_score > 0 else 'neutral',
            'date': self.date.strftime("%Y-%m-%d %H:%M:%S"),
        }

    def __repr__(self):
        return "<Post '{}' by '{}'>".format(self.title, self.author)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False, unique=True)
    password = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(200), unique=True)
    posts = db.relationship('Post', backref='user', lazy='dynamic')
    created_date = db.Column(db.DateTime, default=datetime.utcnow)

    @staticmethod
    def newest(num):
        return User.query.order_by(desc(User.created_date)).limit(num).all()

    @property
    def serialize(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'posts': [p.serialize for p in self.posts],
            'created_date': self.created_date.strftime("%Y-%m-%d %H:%M:%S"),
        }

    def __repr__(self):
        return "<User '{}', '{}'>".format(self.username, self.email)

    @staticmethod
    def username_password_match(_username, _password):
        return User.query.filter_by(username=_username, password=_password).first() is not None

    @staticmethod
    def get_user(_username):
        return User.query.filter_by(username=_username).first()

    @staticmethod
    def get_all_user():
        return User.query.all()

    def hash_password(self):
        self.password = generate_password_hash(self.password).decode('utf8')

    def check_password(self, password):
        return check_password_hash(self.password, password)

