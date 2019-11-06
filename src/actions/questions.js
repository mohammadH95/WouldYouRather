export const GET_QUESTIONS = 'GET_QUESTIONS'
export const QUESTION_ANSWERED = 'QUESTION_ANSWERED'

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