export const GET_QUESTIONS = 'GET_QUESTIONS'
// export const QUESTION_ANSWERED = 'QUESTION_ANSWERED'
export const ADD_QUESTION = 'ADD_QUESTION'
export const DELETE_QUESTION = 'DELETE_QUESTION'
// export const DELETE_ANSWER_QUESTION = 'DELETE_ANSWER_QUESTION'
export const DELETE_USER_QUESTIONS = 'DELETE_USER_QUESTIONS'

export function getQuestion(questions) {
    return {
        type: GET_QUESTIONS,
        questions,
    }
}

// export function questionAnswered(authedUser, qid, answer) {
//     return {
//         type: QUESTION_ANSWERED,
//         authedUser,
//         qid,
//         answer,
//     }
// }

export function addQuestion(question) {    
    return {
        type: ADD_QUESTION,
        question
    }
}

export function deleteQuestion(qid) {
    return {
        type: DELETE_QUESTION,
        qid
    }
}

// export function deleteAnswerQuestion(authedUser, qid, answer) {
//     return {
//         type: DELETE_ANSWER_QUESTION,
//         authedUser,
//         qid,
//         answer
//     }
// }

export function deleteUserQuestion(userQs) {
    return {
        type: DELETE_USER_QUESTIONS,
        userQs,
    }
}