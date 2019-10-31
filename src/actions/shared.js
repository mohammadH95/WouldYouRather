import { _getUsers, _getQuestions } from "../utils/_DATA";
import { getUsers } from "./users";
import { getQuestion } from "./questions";
import { SET_AUTHED_USER } from "./authedUser";

export function handelGetUsers() {
    return (dispatch) => {
        return _getUsers()
            .then((users) => {
                dispatch(getUsers(users))
            })
    }
}

export function handelGetQuestions() {
    return (dispatch) => {
        return _getQuestions()
            .then((questions) => {
                dispatch(getQuestion(questions))
            })
    }
}

export function handelSetAuthedUser(id) {
    return (dispatch) => {
        return dispatch(SET_AUTHED_USER(id))
    }
}