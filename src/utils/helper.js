
export function hasVoted(questions, id, authedUser) {
    return (questions[id].optionOne.votes.includes(authedUser) || questions[id].optionTwo.votes.includes(authedUser))
}