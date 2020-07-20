import { GET_ANSWERS, ADD_ANSWER, DELETE_ANSWER } from "../actions/answers";
import { omit } from "lodash";

export default function answers(state = {}, action) {
    switch (action.type) {
        case GET_ANSWERS:
            return {
                ...state,
                ...action.answers
            }

        case ADD_ANSWER:
            return {
                ...state,
                [action.answer.answerId]: action.answer.answer
            }

        case DELETE_ANSWER:
            return omit(state, action.answerId)
        
        default:
            return state
    }
}