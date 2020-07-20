import React,{ Component } from "react";
import { connect } from "react-redux";
import { Card, ProgressBar, Container, Row, Col, Image, Button } from "react-bootstrap";
import { getVotes } from "../utils/helper";
import { handleDeleteAnswerRedux } from "../actions/shared";

class AnsweredQuestion extends Component {
    handelUpdate = (e) => {
        e.preventDefault()
        const prevlocation = this.props.location.pathname
        const qid = this.props.question.id
        const authedUser = this.props.authedUser
        const answerId = `${authedUser},${qid}`
        
        this.props.dispatch(handleDeleteAnswerRedux(answerId))
        this.props.history.push(`/unansweredQuestion/${qid}`, prevlocation)
    }

    render() {
        const { author, question, userVote, answers } = this.props        
        
        const {
            optionOneV,
            optionTwoV,
            total,
            optionOnePer,
            optionTwoPer,
        } = getVotes(question, answers)

        return (
            <div className='center'>
                <Card>
                    <Card.Header>Asked by {author.name}</Card.Header>
                    <Card.Body>
                        <Container>
                            <Row>
                                <Col className='colImg' xs={4}>
                                    <Image className='img' src={author.avatarURL} alt='UserAvatar'/>
                                </Col>
                                <Col>
                                    <h4>Result:</h4>
                                    <Card>
                                        <p>{question.optionOne}</p>
                                        <ProgressBar className='prog' now={optionOnePer} variant={userVote === 'optionOne' ? ('info') : ('warning')} />
                                        <p>{optionOneV} out of {total}</p>    
                                    </Card>
                                    <Card>
                                        <p>{question.optionTwo}</p>
                                        <ProgressBar className='prog' now={optionTwoPer} variant={userVote === 'optionTwo' ? ('info') : ('warning')} />
                                        <p>{optionTwoV} out of {total}</p> 
                                    </Card>
                                    <Button block variant='warning' type='button' onClick={this.handelUpdate}>Change Vote</Button>
                                </Col>
                            </Row>
                        </Container>
                        
                    </Card.Body>
                </Card>    
            </div>
            
        )
    }
}

function mapStateToProps({users, questions, authedUser, answers}, getID) {
    const question = questions[getID.match.params.id]
    const author = users[question.author]
    const answer = answers[`${authedUser},${question.id}`]
    let userVote
    if (answer) {
        if (answer.answer === 'optionOne') {
            userVote = 'optionOne'
        } else {
            userVote = 'optionTwo'
        }    
    }
        
    return {
        question,
        author,
        authedUser,
        userVote,
        answers
    }
}

export default connect(mapStateToProps)(AnsweredQuestion)