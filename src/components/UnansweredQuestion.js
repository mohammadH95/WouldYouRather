import React,{ Component } from "react";
import { Card, Button, Form, Container, Row, Col, Image } from "react-bootstrap";
import { connect } from "react-redux";
import { handleSaveAnswer } from "../actions/shared";

class UnansweredQuestion extends Component {
    state = {
        answer: '',
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { answer } = this.state
        const { question, authedUser } = this.props

        

        this.props.dispatch(handleSaveAnswer(authedUser, question.id, answer))


        this.props.history.push(`/answeredQuestion/${question.id}`)
        
        
    }

    handleChange = (e) => {
        e.persist()
        this.setState({
            answer: e.target.value
        })
    }

    render() {
        const { question, author } = this.props


        return (
            <div className='center'>
                <Card>
                    <Card.Header>{author.name} asks:</Card.Header>
                    <Card.Body>
                        <Container>
                            <Row>
                                <Col className='colImg' xs={4}>
                                    <Image className='img' src={author.avatarURL} alt='UserAvatar'/>
                                </Col>
                                <Col>
                                    <form onSubmit={this.handleSubmit}>
                                        <Form.Group>
                                            <input type='radio' name='answer' value='optionOne' onChange={this.handleChange} />
                                            <span style={{marginLeft:5}}>{question.optionOne.text}</span>
                                        </Form.Group>
                                        <Form.Group>
                                            <input type='radio' name='answer' value='optionTwo' onChange={this.handleChange} />
                                            <span style={{marginLeft:5}}>{question.optionTwo.text}</span>
                                        </Form.Group>
                                        <Form.Group>
                                            <Button block type='submit'>Submit</Button>
                                        </Form.Group>
                                    </form>        
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
    
    
    return {
        question,
        author,
        authedUser,
    }
}

export default connect(mapStateToProps)(UnansweredQuestion)