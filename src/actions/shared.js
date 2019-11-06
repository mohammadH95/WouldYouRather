import { getInitialData } from "../utils/api";
import { _saveQuestionAnswer, _saveQuestion } from "../utils/_DATA";
import { showLoading, hideLoading } from "react-redux-loading";
import { getUsers, userAnswered, userAddQuestion } from "./users";
import { getQuestion, questionAnswered, addQuestion } from "./questions";

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

export function handleAddQuestion(question) {    
    return (dispatch) => {
        dispatch(showLoading())
        return _saveQuestion(question)
            .then((formattedQuestion) => {
                dispatch(userAddQuestion(formattedQuestion))
                dispatch(addQuestion(formattedQuestion))
                dispatch(hideLoading())
            })
    }
}