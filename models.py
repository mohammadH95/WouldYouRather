import os
from sqlalchemy import Column, String, Integer, create_engine, Table, ForeignKey
from flask_sqlalchemy import SQLAlchemy
import json

database_name = "wouldyourather"
database_path = "postgres://mkptybcqujfmbz:c69b6851994bca1a574296c3780f76146c5ae67bdd2d3ecea51a6dbbebdfdbca@ec2-54-234-28-165.compute-1.amazonaws.com:5432/da5r8j9n487gpk"

db = SQLAlchemy()

def setup_db(app, database_path=database_path):
    app.config["SQLALCHEMY_DATABASE_URI"] = database_path
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.app = app
    db.init_app(app)
    db.create_all

Answers = db.Table(
    'answers',
    db.Column('user_id', String, ForeignKey('users.id', ondelete="cascade"), primary_key=True),
    db.Column('question_id', String, ForeignKey('questions.id', ondelete="cascade"), primary_key=True),
    db.Column('answer', String)
)

class Users(db.Model):
    __tablename__ = 'users'

    id = Column(String, primary_key=True)
    name = Column(String)
    avatarURL = Column(String(200))
    questions = db.relationship('Questions', cascade="all, delete", passive_deletes=True)
    answer = db.relationship(
        'Questions',
        secondary=Answers,
        backref=db.backref('users', cascade="all, delete", passive_deletes=True)
    )

    def __init__(self, id, name, avatarURL):
        self.id = id
        self.name = name
        self.avatarURL = avatarURL

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def format(self):
        return {
            'id': self.id,
            'name': self.name,
            'avatarURL' : self.avatarURL
        }

class Questions(db.Model):
    __tablename__ = 'questions'

    id = Column(String, primary_key=True)
    optionOne = Column(String)
    optionTwo = Column(String)
    author = Column(
        String, ForeignKey('users.id', ondelete="cascade"), nullable=False
    )

    def __init__(self, id, author, optionOne, optionTwo):
        self.id = id
        self.author = author
        self.optionOne = optionOne
        self.optionTwo = optionTwo

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def format(self):
        return {
            'id': self.id,
            'author' : self.author,
            'optionOne' : self.optionOne,
            'optionTwo' : self.optionTwo
        }