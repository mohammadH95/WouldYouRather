export const GET_USERS = 'GET_USERS'
export const ADD_USER = 'ADD_USER'
// export const USER_ANSWERED = 'USER_ANSWERED'
// export const USER_ADD_QUESTION = 'USER_ADD_QUESTION'
// export const DELETE_USER_QUESTION = 'DELETE_USER_QUESTION'
// export const DELETE_ANSWER_USER = 'DELETE_ANSWER_USER'
export const DELETE_USER = "DELETE_USER"

export function getUsers(users) {
    return {
        type: GET_USERS,
        users,
    }
}

export function addUser(user) {
    return {
        type: ADD_USER,
        user
    }
}

// export function userAnswered(authedUser, qid, answer) {
//     return {
//         type: USER_ANSWERED,
//         authedUser,
//         qid,
//         answer,
//     }
// }

// export function userAddQuestion(question) {    
//     return {
//         type: USER_ADD_QUESTION,
//         question   
//     }
    
// }

// export function deleteUserQuestion(author, qid) {
//     return {
//         type: DELETE_USER_QUESTION,
//         author,
//         qid
//     }
// }

// export function deleteAnswerUser(authedUser, qid) {
//     return {
//         type: DELETE_ANSWER_USER,
//         authedUser,
//         qid
//     }
// }

export function deleteUser(userId) {
    return {
        type: DELETE_USER,
        userId,
    }
}