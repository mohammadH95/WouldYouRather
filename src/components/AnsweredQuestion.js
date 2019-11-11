import React,{ Component } from "react";
import { connect } from "react-redux";
import { Card, ProgressBar, Container, Row, Col, Image } from "react-bootstrap";
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
                                        <p>{question.optionOne.text}</p>
                                        <ProgressBar className='prog' now={optionOnePer} variant={userVote === 'optionOne' ? ('info') : ('warning')} />
                                        <p>{optionOneV} out of {total}</p>    
                                    </Card>
                                    <Card>
                                        <p>{question.optionTwo.text}</p>
                                        <ProgressBar className='prog' now={optionTwoPer} variant={userVote === 'optionTwo' ? ('info') : ('warning')} />
                                        <p>{optionTwoV} out of {total}</p> 
                                    </Card>            
                                </Col>
                            </Row>
                        </Container>
                        
                    </Card.Body>
                </Card>    
            </div>
            
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