export const GET_USERS = 'GET_USERS'
export const USER_ANSWERED = 'USER_ANSWERED'

export function getUsers(users) {
    return {
        type: GET_USERS,
        users,
    }
}

export function userAnswered(authedUser, qid, answer) {
    return {
        type: USER_ANSWERED,
        authedUser,
        qid,
        answer,
    }
}