
export function hasVoted(questions, id, authedUser) {
    return (questions[id].optionOne.votes.includes(authedUser) || questions[id].optionTwo.votes.includes(authedUser))
}

export function getVotes(question) {    

    const optionOneV = question.optionOne.votes.length
    const optionTwoV = question.optionTwo.votes.length
    const total = optionOneV + optionTwoV
    const optionOnePer = Math.fround((optionOneV / total) * 100)
    const optionTwoPer = Math.fround((optionTwoV / total) * 100)

    return {
        optionOneV,
        optionTwoV,
        total,
        optionOnePer,
        optionTwoPer,
    }
}

export function score(user) {
    const answeredQ = Object.keys(user.answers).length
    const createdQ = user.questions.length
    const score = answeredQ + createdQ

    return score
}