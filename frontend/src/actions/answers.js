export const GET_ANSWERS = 'GET_ANSWERS'
export const ADD_ANSWER = 'ADD_ANSWER'
export const DELETE_ANSWER = 'DELETE_ANSWER'

export function getAnswers(answers) {
    return {
        type: GET_ANSWERS,
        answers
    }
}

export function addAnswer(answer) {
    return {
        type: ADD_ANSWER,
        answer
    }
}

export function deleteAnswer(answerId) {
    return {
        type: DELETE_ANSWER,
        answerId
    }
}