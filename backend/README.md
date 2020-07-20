# Full Stack Would You Rather Backend

## Getting Started

### Installing Dependencies

#### Python

Follow instructions to install the latest version of python for your platform in the [python docs](https://docs.python.org/3/using/unix.html#getting-and-installing-the-latest-version-of-python)

#### Virtual Enviornment

We recommend working within a virtual environment whenever using Python for projects. This keeps your dependencies for each project separate and organaized. Instructions for setting up a virual enviornment for your platform can be found in the [python docs](https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/)

#### PIP Dependencies

Once you have your virtual environment setup and running, install dependencies by naviging to the `/backend` directory and running:

```bash
pip install -r requirements.txt
```

This will install all of the required packages we selected within the `requirements.txt` file.

##### Key Dependencies

- [Flask](http://flask.pocoo.org/)  is a lightweight backend microservices framework. Flask is required to handle requests and responses.

- [SQLAlchemy](https://www.sqlalchemy.org/) is the Python SQL toolkit and ORM we'll use handle the lightweight sqlite database. You'll primarily work in app.py and can reference models.py. 

- [Flask-CORS](https://flask-cors.readthedocs.io/en/latest/#) is the extension we'll use to handle cross origin requests from our frontend server.

## Database Setup
With Postgres running, restore a database using the wouldyourather.psql file provided. From the backend folder in terminal run:
```bash
psql wouldyourather < wouldyourather.psql
```

## Running the server
From within the `backend` directory first ensure you are working using your created virtual environment.
To run the server, execute:
```bash
python api.py OR python3 api.py
```

## Authorization
The API uses the Auth0 Role Based Access Control mechanisms for implementing authorization for endpoints. The Roles and their permissions are:
* Users: [
    post:questions,
    post:answers,
    patch:answers
]
* Administrator: [
    ..all users permissions,
    delete:questions,
    delete:users
]

## API Reference

### Endpoints

#### GET /users
- Get dictionary of users
- Request Arguments: None
- Response:
```
{
  "success": true,
  "users": {
    "johndoe": {
      "avatarURL": "https://icon-library.net/images/avatar-icon/avatar-icon-22.jpg",
      "id": "johndoe",
      "name": "John Doe"
    },
    "sarahedo": {
      "avatarURL": "https://icon-library.net/images/avatar-icon/avatar-icon-8.jpg",
      "id": "sarahedo",
      "name": "Sarah Edo"
    }
  }
}
```

#### GET /questions
- Get dictionary of questions
- Request Arguments: None
- Response:
```
{
  "questions": {
    "6ni6ok3ym7mf1p33lnez": {
      "author": "johndoe",
      "id": "6ni6ok3ym7mf1p33lnez",
      "optionOne": "become a superhero",
      "optionTwo": "become a supervillain"
    },
    "loxhs1bqm25b708cmbf3g": {
      "author": "sarahedo",
      "id": "loxhs1bqm25b708cmbf3g",
      "optionOne": "be a front-end developer",
      "optionTwo": "be a back-end developer"
    }
  },
  "success": true
}
```

#### GET /answers
- Get dictionary of answers
- Request Arguments: None
- Response:
```
{
  "answers": {
    "johndoe,6ni6ok3ym7mf1p33lnez": {
      "answer": "optionTwo",
      "question_id": "6ni6ok3ym7mf1p33lnez",
      "user_id": "johndoe"
    },
    "sarahedo,loxhs1bqm25b708cmbf3g": {
      "answer": "optionTwo",
      "question_id": "loxhs1bqm25b708cmbf3g",
      "user_id": "sarahedo"
    }
  },
  "success": true
}
```

#### POST /users
- Create new user
- Request Arguments: None
- Request body:{id:string, name:string, avatarURL:string}
- Response:
```
{
  "created": {
    "avatarURL": "https://lh3.googleusercontent.com/a-/AOh14Gj3giUjYiN6mjnTzGSyrSzjfDaoITZikqQg_Qq5Lg",
    "id": "mhs",
    "name": "Mohammad"
  },
  "success": true
}
```

#### POST /questions
- Create new question
- Request Arguments: None
- Request body:{id:string, optionOne:string, optionTwo:string, user_id:string}
- Response:
```
{
  "created": {
    "author": "mhs",
    "id": "vthrdm985a262al8qx3dc",
    "optionOne": "find $50 yourself",
    "optionTwo": "have your best friend find $500"
  },
  "success": true
}
```

#### POST /answers
- Create new answer
- Request Arguments: None
- Request body:{answer:string, user_id:string, question_id:string}
- Response:
```
{
  "answer": {
    "answer": {
      "answer": "optionTwo",
      "question_id": "vthrdm985a262al8qx3dc",
      "user_id": "mhs"
    },
    "answerId": "mhs,vthrdm985a262al8qx3dc"
  },
  "success": true
}
```

#### PATCH /answers/{question_id}
- Update the answer
- Request Arguments: question_id
- Request body:{answer:string, user_id:string}
- Response:

```
{
  "success": true,
  "updates": {
    "answer": {
      "answer": "optionOne",
      "question_id": "vthrdm985a262al8qx3dc",
      "user_id": "mhs"
    },
    "answerId": "mhs,vthrdm985a262al8qx3dc"
  }
}
```

#### DELETE /questions/{question_id}
- Delete a questions
- Request Arguments: question_id
- Response:
```
{
  "deleted": "vthrdm985a262al8qx3dc",
  "success": true
}
```

#### DELETE /users/{user_id}
- Delete a questions
- Request Arguments: user_id
- Response:
```
{
  "deleted": "mhs",
  "success": true
}
```

### Error Handling
Errors are returned as JSON objects in the following format:
```
{
    "success": False, 
    "error": 404,
    "message": "Page Not Found"
}
```
The API will return error types when requests fail:
- 401: Unauthorized
- 403: Forbidden 
- 404: Resource Not Found
- 405: Method not allowed
- 422: Not Processable

## Testing
To run the tests, run
```
dropdb wouldurathertest
createdb wouldurathertest
psql wouldurathertest < wouldyourather.psql
python test_api.py
```