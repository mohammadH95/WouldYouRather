import os
from flask import Flask, request, abort, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import and_
from flask_cors import CORS
from models import setup_db, Questions, Users, Answers
from auth.auth import AuthError, requires_auth

db = SQLAlchemy()

def create_app(test_config=None):
    app = Flask(__name__, static_folder='./frontend/build', static_url_path='/')
    setup_db(app)
    CORS(app)

    @app.after_request
    def after_request(response):
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization, true')
        response.headers.add('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')
        return response

    @app.route('/')
    def index():
        return render_template('index.html')

    # GET all Users 
    @app.route('/users')
    def get_players():
        users = Users.query.all()        
        users_formatted = {}

        for user in users:
            user = user.format()
            users_formatted.update({user['id']:user})

        return jsonify({
            'success': True,
            'users': users_formatted
        })

    # GET all questions
    @app.route('/questions')
    def get_questions():
        questions = Questions.query.all()
        questions_formatted = {}

        for question in questions:
            question = question.format()
            questions_formatted.update({question['id']:question})

        return jsonify({
            'success': True,
            'questions': questions_formatted
        })

    # GET all answers
    @app.route('/answers')
    def get_answers():
        answers = db.session.query(Answers).all()

        answers_formatted = {}
        for answer in answers:
            answerdict = dict(user_id=answer[0], question_id=answer[1], answer=answer[2])
            answersid = answer[0]+','+answer[1]
            answers_formatted.update({answersid:answerdict})

        return jsonify({
            'success': True,
            'answers': answers_formatted
        })

    # POST new user
    @app.route('/users', methods=['POST'])
    def create_user():
        try:
            body = request.get_json()

            new_id = body.get('id', None)
            new_name = body.get('name', None)
            new_avatarURL = body.get('avatarURL', None)
            user_formatted = {}
            user = Users(id=new_id, name=new_name, avatarURL=new_avatarURL)
            user.insert()
            user = user.format()
            return jsonify({
                'success': True,
                'created': user
            })   
        except:
            abort(422)
        


    # POST new question

    @app.route('/questions', methods=['POST'])
    @requires_auth('post:questions')
    def create_question(token):
        try:
            body = request.get_json()

            new_id = body.get('id', None)
            new_optionOne = body.get('optionOne', None)
            new_optionTwo = body.get('optionTwo', None)
            author = body.get('user_id', None)

            question = Questions(id=new_id, author=author, optionOne=new_optionOne, optionTwo=new_optionTwo)
            question.insert()

            question = question.format()
            
            return jsonify({
                'success': True,
                'created': question
            })    
        except:
            abort(422)
        

    # POST new answer
    @app.route('/answers', methods=['POST'])
    @requires_auth('post:answers')
    def post_answer(token):
        try:
            body = request.get_json()

            new_answer = body.get('answer', None)
            user_id = body.get('user_id', None)
            question_id = body.get('question_id', None)

            answer = Answers.insert().values(
                answer=new_answer,
                user_id=user_id,
                question_id=question_id
            )
            db.session.execute(answer)
            db.session.commit()
            answerId = user_id + ',' + question_id
            answerD = {
                'answer': {'user_id': user_id, 'question_id': question_id, 'answer': new_answer},
                'answerId': answerId
            }
            return jsonify({
                'success': True,
                'answer': answerD,
            })    
        except:
            abort(422)
        

    # Update answer
    @app.route('/answers/<question_id>', methods=['PATCH'])
    @requires_auth('patch:answers')
    def update_question(token, question_id):
        try:
            body = request.get_json()

            new_answer = body.get('answer', None)
            user_id = body.get('user_id', None)

            answer = Answers.update().\
                where(and_(Answers.c.user_id == user_id, Answers.c.question_id == question_id)).\
                values(answer=new_answer)
            db.session.execute(answer)
            db.session.commit()

            answerId = user_id + ',' + question_id
            answerD = {
                'answer': {'user_id': user_id, 'question_id': question_id, 'answer': new_answer},
                'answerId': answerId
            }   

            return jsonify({
                'success': True,
                'updates': answerD
            })    
        except:
            abort(400)
        

    # DELETE question
    @app.route('/questions/<question_id>', methods=['DELETE'])
    @requires_auth('delete:questions')
    def delete_question(token, question_id):
        try:
            question = Questions.query.get(question_id)
            question.delete()

            return jsonify({
                'success': True,
                'deleted': question_id
            })    
        except:
            abort(422)
        

    # DELETE user
    @app.route('/users/<user_id>', methods=['DELETE'])
    @requires_auth('delete:users')
    def delete_user(token, user_id):
        try:
            user = Users.query.get(user_id)
            user.delete()

            return jsonify({
                'success': True,
                'deleted': user_id
            })    
        except:
            abort(422)
        

    # Errors handlers
    @app.errorhandler(AuthError)
    def unauthorized(error):
        return jsonify({
            "success": False,
            "error": error.status_code,
            "message": error.error["description"]
        }), error.status_code

    @app.errorhandler(404)
    def not_found(error):
        return jsonify({
            "success": False, 
            "error": 404,
            "message": "Page Not Found"
            }), 404
        
    @app.errorhandler(422)
    def unprocessable(error):
        return jsonify({
            "success": False, 
            "error": 422,
            "message": "unprocessable"
            }), 422

    @app.errorhandler(400)
    def bad_request(error):
        return jsonify({
            "success": False, 
            "error": 400,
            "message": "bad request"
            }), 400

    @app.errorhandler(405)
    def not_allowed(error):
        return jsonify({
            "success": False, 
            "error": 405,
            "message": "method not allowed"
            }), 405

    return app

    

app = create_app()

if __name__ == '__main__':
    app.run()