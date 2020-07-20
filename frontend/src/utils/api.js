const api = "http://127.0.0.1:5000"

function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function _getUsers () {
  return fetch(`${api}/users`)
    .then(res => res.json())
    .then(data => data.users)
}

export function _getQuestions () {
  return fetch(`${api}/questions`)
    .then(res => res.json())
    .then(data => data.questions)
}

export function _getAnswers() {
  return fetch(`${api}/answers`)
    .then(res => res.json())
    .then(data => data.answers)
}

export function getInitialData() {
  return Promise.all([
      _getUsers(),
      _getQuestions(),
      _getAnswers(),
  ]).then(([users, questions, answers]) => ({
      users,
      questions,
      answers,
  }))
}

export function _saveUsers(user) {
  return fetch(`${api}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: user.email,
      name: user.name,
      avatarURL: user.picture,
    })
  }).then(res => res.json())
    .then(data => data.created)
}

export function _deleteUser(token, userId) {
  return fetch(`${api}/users/${userId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

export function _saveQuestion (token, question) {
  return fetch(`${api}/questions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      id: generateUID(),
      user_id: question.author,
      optionOne: question.optionOneText,
      optionTwo: question.optionTwoText
    })
  }).then(res => res.json())
    .then(data => data.created)
}

export function _saveQuestionAnswer ({ token, authedUser, qid, answer }) {  
  return fetch(`${api}/answers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      answer: answer,
      user_id: authedUser,
      question_id: qid
    })
  }).then(res => res.json())
    .then(data => data.answer)
}

export function _deleteQuestion (token, qid) {
  return fetch(`${api}/questions/${qid}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

export function _updateAnswer(token, authedUser, qid, answer) {
  return fetch(`${api}/answers/${qid}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      answer: answer,
      user_id: authedUser,
      question_id: qid
    })
  }).then(res => res.json())
    .then(data => data.updates)
}