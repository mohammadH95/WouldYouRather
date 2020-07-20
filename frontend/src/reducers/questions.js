import { GET_QUESTIONS, ADD_QUESTION, DELETE_QUESTION, DELETE_USER_QUESTIONS } from "../actions/questions";
import { omit } from "lodash";

export default function questions(state = {}, action) {
    switch (action.type) {
        case GET_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }

        case ADD_QUESTION:
            return {
                ...state,
                [action.question.id]: action.question
            }

        case DELETE_QUESTION:            
            return omit(state, action.qid)

        case DELETE_USER_QUESTIONS:
            return omit(state, action.userQs)

        default:
            return state
    }
}