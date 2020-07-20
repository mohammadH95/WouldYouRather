import { getInitialData, _saveQuestionAnswer, _saveQuestion, _deleteQuestion, _updateAnswer, _saveUsers, _deleteUser } from "../utils/api";
import { showLoading, hideLoading } from "react-redux-loading";
import { getUsers, addUser, deleteUser } from "./users";
import { getQuestion, addQuestion, deleteQuestion, deleteUserQuestion } from "./questions";
import { getAnswers, addAnswer, deleteAnswer } from "./answers";

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
            .then(({ users, questions, answers }) => {
                dispatch(getUsers(users))
                dispatch(getQuestion(questions))
                dispatch(getAnswers(answers))
                dispatch(hideLoading())
            })
    }
}

export function handleAddUser(user) {
    return (dispatch) => {
        dispatch(showLoading())
        return _saveUsers(user)
            .then((formattedUser) => {
                dispatch(addUser(formattedUser))
                dispatch(hideLoading())
            })
    }
}

export function handleSaveAnswer(token, authedUser, qid, answer) {
    return (dispatch) => {
        dispatch(showLoading())
        return _saveQuestionAnswer({token, authedUser, qid, answer})
            .then((answer) => {
                dispatch(addAnswer(answer))
                dispatch(hideLoading())
            })
    }
}

export function handleAddQuestion(token, question) {    
    return (dispatch) => {
        dispatch(showLoading())
        return _saveQuestion(token, question)
            .then((formattedQuestion) => {
                console.log("tetetetettet", formattedQuestion.id);
                dispatch(addQuestion(formattedQuestion))
                dispatch(hideLoading())
            })
    }
}

export function handleDeleteQuestion(token, qid) {
    return (dispatch) => {
        dispatch(showLoading())
        return _deleteQuestion(token, qid)
            .then(() => {
                dispatch(deleteQuestion(qid))
                dispatch(hideLoading())
            })
    }
}

export function handleDeleteAnswerRedux(answerId) {
    return (dispatch) => {
        dispatch(showLoading())
        dispatch(deleteAnswer(answerId))
        dispatch(hideLoading())
    }
}

export function handleUpdateAnswer(token, authedUser, qid, answer) {
    return (dispatch) => {
        dispatch(showLoading())
        return _updateAnswer(token, authedUser, qid, answer)
            .then((answer) => {
                dispatch(addAnswer(answer))
                dispatch(hideLoading())
            })
    }
}

export function handleDeleteUser(token, userId, userQs) {
    return (dispatch) => {
        dispatch(showLoading())
        return _deleteUser(token, userId)
            .then(() => {
                dispatch(deleteUser(userId))
                dispatch(deleteUserQuestion(userQs))
                dispatch(hideLoading())
            })
    }
}