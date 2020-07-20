import { GET_USERS, ADD_USER, DELETE_USER } from "../actions/users";
import { omit } from "lodash";

export default function users(state = {}, action) {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                ...action.users
            }

        case ADD_USER :
            return {
                ...state,
                [action.user.id]: action.user
            }

        case DELETE_USER:
            return omit(state, action.userId)
    
        default:
            return state
    }
}