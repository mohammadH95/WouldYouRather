import os
import unittest
import json
from flask_sqlalchemy import SQLAlchemy

from api import create_app
from models import setup_db, Questions, Users, Answers

user_token = "Bearer {}".format(os.environ.get('USER_TOKEN'))
administrator_token = "Bearer {}".format(os.environ.get('ADMINISTRSTOR_TOKEN'))

class WouldURatherTestCase(unittest.TestCase):
    """This class represents the WouldURather test case"""

    def setUp(self):
        """Define test variables and initialize app."""
        self.app = create_app()
        self.client = self.app.test_client
        self.database_name = "wouldurathertest"
        self.database_path = "postgresql://{}@{}/{}".format('postgres:0000', 'localhost:5432', self.database_name)
        setup_db(self.app, self.database_path)

        # binds the app to the current context
        with self.app.app_context():
            self.db = SQLAlchemy()
            self.db.init_app(self.app)
            # create all tables
            self.db.create_all()

        self.new_user = {
            'id': 'UserID',
            'name': 'UserTest',
            'avatarURL': 'www.avatarURL.com'
        }

        self.new_question = {
            'id': 'QuestionId',
            'optionOne': 'optionOneTest',
            'optionTwo': 'optionTwoTest',
            'author': 'johndoe'
        }

        self.new_answer = {
            'answer': 'optionOne',
            'user_id': 'johndoe',
            'question_id': '8xf0y6ziyjabvozdd253nd'
        }
    
    def tearDown(self):
        """Executed after reach test"""
        pass


    def test_get_users(self):
        res = self.client().get('/users')
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)
        self.assertTrue(data['users'])

    def test_get_questions(self):
        res = self.client().get('/questions')
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)
        self.assertTrue(data['questions'])

    def test_get_answers(self):
        res = self.client().get('/answers')
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)
        self.assertTrue(data['answers'])

    def test_post_user(self):
        res = self.client().post('/users', json=self.new_user)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)
        self.assertTrue(data['created'])

    def test_post_question(self):
        res = self.client().post('/questions', json=self.new_question, headers={"Authorization": user_token})
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)
        self.assertTrue(data['created'])

    def test_post_answer(self):
        res = self.client().post('/answers', json=self.new_answer, headers={"Authorization": user_token})
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)
        self.assertTrue(data['answer'])

    def test_update_answer(self):
        res = self.client().patch('/answers/8xf0y6ziyjabvozdd253nd', json={'answer': 'optionTwo', 'user_id': 'sarahedo'}, 
            headers={"Authorization": user_token})
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)
        self.assertTrue(data['updates'])

    def test_delete_question(self):
        res = self.client().delete('/questions/xj352vofupe1dqz9emx13r', headers={"Authorization": administrator_token})
        data = json.loads(res.data)
        question = Questions.query.filter(Questions.id == 'xj352vofupe1dqz9emx13r').one_or_none()

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)
        self.assertEqual(data['deleted'], 'xj352vofupe1dqz9emx13r')
        self.assertEqual(question, None)

    def test_delete_user(self):
        res = self.client().delete('/users/tylermcginnis', headers={"Authorization": administrator_token})
        data = json.loads(res.data)
        user = Users.query.filter(Users.id == 'tylermcginnis').one_or_none()

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)
        self.assertEqual(data['deleted'], 'tylermcginnis')
        self.assertEqual(user, None)

    def test_error_401(self):
        res = self.client().post('/questions')
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 401)
        self.assertEqual(data['success'], False)

    def test_error_403(self):
        res = self.client().delete('/questions/8xf0y6ziyjabvozdd253nd', headers={"Authorization": user_token})
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 403)
        self.assertEqual(data['success'], False)

    def test_error_404(self):
        res = self.client().get('/NotExistPage')
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 404)
        self.assertEqual(data['success'], False)
        self.assertEqual(data['message'], 'Page Not Found')

    def test_error_405(self):
            res = self.client().post('/questions/8xf0y6ziyjabvozdd253nd', json=self.new_question)
            data = json.loads(res.data)

            self.assertEqual(res.status_code, 405)
            self.assertEqual(data['success'], False)
            self.assertEqual(data['message'], 'method not allowed')

    def test_error_422(self):
        res = self.client().delete('/questions/500', headers={"Authorization": administrator_token})
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 422)
        self.assertEqual(data['success'], False)
        self.assertEqual(data['message'], 'unprocessable')

    
# Make the tests conveniently executable
if __name__ == "__main__":
    unittest.main()