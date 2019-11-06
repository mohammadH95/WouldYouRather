import { GET_QUESTIONS, QUESTION_ANSWERED, ADD_QUESTION } from "../actions/questions";

export default function questions(state = {}, action) {
    switch (action.type) {
        case GET_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }

        case QUESTION_ANSWERED:
            return {
                ...state,
                [action.qid]: {
                    ...state[action.qid],
                    [action.answer]: {
                        ...state[action.qid][action.answer],
                        votes: state[action.qid][action.answer].votes.concat([action.authedUser])
                    }
                }
            }

        case ADD_QUESTION:
            return {
                ...state,
                [action.question.id]: action.question
            }
    
        default:
            return state
    }
}