import React,{ Component } from "react";
import { connect } from "react-redux";
import { Card, ProgressBar } from "react-bootstrap";
import { getVotes } from "../utils/helper";

class AnsweredQuestion extends Component {
    render() {
        const { author, question, userVote } = this.props
        
        const {
            optionOneV,
            optionTwoV,
            total,
            optionOnePer,
            optionTwoPer,
        } = getVotes(question)

        return (
            <Card>
                <Card.Header>Asked by {author.name}</Card.Header>
                <Card.Body>
                    <Card>
                        <p>{question.optionOne.text}</p>
                        <ProgressBar now={optionOnePer} variant={userVote === 'optionOne' ? ('info') : ('warning')} />
                        <p>{optionOneV} out of {total}</p>    
                    </Card>
                    <Card>
                        <p>{question.optionTwo.text}</p>
                        <ProgressBar now={optionTwoPer} variant={userVote === 'optionTwo' ? ('info') : ('warning')} />
                        <p>{optionTwoV} out of {total}</p> 
                    </Card>
                </Card.Body>
            </Card>
        )
    }
}

function mapStateToProps({users, questions, authedUser}, getID) {
    const question = questions[getID.match.params.id]
    const author = users[question.author]

    let userVote 
    if (question.optionOne.votes.includes(authedUser)) {
        userVote = 'optionOne'
    } else {
        userVote = 'optionTwo'
    }
        
    return {
        question,
        author,
        authedUser,
        userVote
    }
}

export default connect(mapStateToProps)(AnsweredQuestion)