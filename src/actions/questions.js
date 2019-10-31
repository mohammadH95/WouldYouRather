export const GET_QUESTIONS = 'GET_QUESTIONS'

export function getQuestion(questions) {
    return {
        type: GET_QUESTIONS,
        questions,
    }
}