export const GET_QUESTIONS = 'GET_QUESTIONS'
export const QUESTION_ANSWERED = 'QUESTION_ANSWERED'
export const ADD_QUESTION = 'ADD_QUESTION'

export function getQuestion(questions) {
    return {
        type: GET_QUESTIONS,
        questions,
    }
}

export function questionAnswered(authedUser, qid, answer) {
    return {
        type: QUESTION_ANSWERED,
        authedUser,
        qid,
        answer,
    }
}

export function addQuestion(question) {    
    return {
        type: ADD_QUESTION,
        question
    }
}