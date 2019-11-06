import { GET_USERS, USER_ANSWERED, USER_ADD_QUESTION } from "../actions/users";

export default function users(state = {}, action) {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                ...action.users
            }

        case USER_ANSWERED:
            return {
                ...state,
                [action.authedUser]: {
                    ...state[action.authedUser],
                    answers: {
                        ...state[action.authedUser].answers,
                        [action.qid]: action.answer
                    }
                }
            }

        case USER_ADD_QUESTION:            
            return {
                ...state,
                [action.question.author]: {
                    ...state[action.question.author],                    
                    questions: [...state[action.question.author].questions, action.question.id]
                }                
            }
    
        default:
            return state
    }
}