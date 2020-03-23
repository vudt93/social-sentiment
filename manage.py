from social_sentiment import app, db
from flask_script import Manager, prompt_bool

from social_sentiment.models import User

manager = Manager(app)


@manager.command
def initdb():
    db.create_all()
    user = User(username='admin', password='123456', email='vudt93@gmail.com')
    user.hash_password()
    db.session.add(user)
    db.session.commit()
    print("Initialized the db")


@manager.command
def dropdb():
    if prompt_bool("Are u sure to lose all data?"):
        db.drop_all()
        print("Dropped the db")


if __name__ == '__main__':
    manager.run()