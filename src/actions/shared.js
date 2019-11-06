import { getInitialData } from "../utils/api";
import { _saveQuestionAnswer } from "../utils/_DATA";
import { showLoading, hideLoading } from "react-redux-loading";
import { getUsers, userAnswered } from "./users";
import { getQuestion, questionAnswered } from "./questions";

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
            .then(({ users, questions }) => {
                dispatch(getUsers(users))
                dispatch(getQuestion(questions))
                dispatch(hideLoading())
            })
    }
}

export function handleSaveAnswer(authedUser, qid, answer) {
    return (dispatch) => {
        dispatch(showLoading())
        return _saveQuestionAnswer({authedUser, qid, answer})
            .then(() => {
                dispatch(userAnswered(authedUser, qid, answer))
                dispatch(questionAnswered(authedUser, qid, answer))
                dispatch(hideLoading())
            })
    }
}