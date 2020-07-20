export function hasVoted(answers, id, authedUser) {
    return (answers.hasOwnProperty(`${authedUser},${id}`))
}

export function getVotes(question, answers) {
    var optionOneV = 0
    var optionTwoV = 0
    Object.keys(answers).forEach((key) => {
        if (key.includes(question.id)) {
            if (answers[key].answer === "optionOne") {
                optionOneV++
            } else {
                optionTwoV++
            }
        }
    })
    
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

export function getAnsweredQ(user, answers) {
    var answeredQ = 0
    Object.keys(answers).forEach((key) => {
        if (key.includes(user.id)) {
            answeredQ++
        }
    })
    return answeredQ
}

export function getCreatedQ(user, questions) {
    var createdQ = 0
    Object.keys(questions).forEach((key) => {
        if (questions[key].author === user.id) {
            createdQ++
        }
    })
    return createdQ
}

export function score(user, questions, answers) {
    const answeredQ = getAnsweredQ(user, answers)
    const createdQ = getCreatedQ(user, questions)
    const score = answeredQ + createdQ
    return score
}

export function getAnswer(answers, authedUser, qid) {
    return answers[`${authedUser},${qid}`].answer
}