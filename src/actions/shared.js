import { _getUsers, _getQuestions } from "../utils/_DATA";
import { showLoading, hideLoading } from "react-redux-loading";
import { getUsers } from "./users";
import { getQuestion } from "./questions";

export function handelGetUsers() {
    return (dispatch) => {
        dispatch(showLoading())
        return _getUsers()
            .then((users) => {
                dispatch(getUsers(users))
                dispatch(hideLoading())
            })
    }
}

export function handelGetQuestions() {
    return (dispatch) => {
        dispatch(showLoading())
        return _getQuestions()
            .then((questions) => {
                dispatch(getQuestion(questions))
                dispatch(hideLoading())
            })
    }
}