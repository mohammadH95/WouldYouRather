import React,{ Component } from "react";
import { Card, Button, Form, Container, Row, Col, Image } from "react-bootstrap";
import { connect } from "react-redux";
import { handleSaveAnswer, handleDeleteQuestion, handleUpdateAnswer } from "../actions/shared";
import jwt from 'jwt-decode'

class UnansweredQuestion extends Component {
    state = {
        answer: '',
        disabled: true
    }

    componentDidMount() {
        const jwt_decoded = jwt(localStorage.getItem('token'))
        if (jwt_decoded.permissions.includes('delete:questions')) {
            this.setState({ disabled: false })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()        

        const token = localStorage.getItem('token')
        const { answer } = this.state
        const { question, authedUser } = this.props

        this.props.dispatch(handleSaveAnswer(token, authedUser, question.id, answer))
        this.props.history.push(`/answeredQuestion/${question.id}`)
    }

    handelDelete = (e) => {
        e.preventDefault()
        const qid = this.props.question.id

        const token = localStorage.getItem('token')
        this.props.dispatch(handleDeleteQuestion(token, qid))

        this.props.history.push(`/home`)
    }

    handleUpdate = (e) => {
        e.preventDefault()
        const { answer } = this.state
        const { question, authedUser } = this.props
        const token = localStorage.getItem('token')

        this.props.dispatch(handleUpdateAnswer(token, authedUser, question.id, answer))
        this.props.history.push(`/answeredQuestion/${question.id}`)
    }

    handleChange = (e) => {
        e.persist()
        this.setState({
            answer: e.target.value
        })
    }

    render() {
        const disabled = this.state.disabled
        const { question, author } = this.props
        const prevlocation = this.props.location.state      

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
                                            <span style={{marginLeft:5}}>{question.optionOne}</span>
                                        </Form.Group>
                                        <Form.Group>
                                            <input type='radio' name='answer' value='optionTwo' onChange={this.handleChange} />
                                            <span style={{marginLeft:5}}>{question.optionTwo}</span>
                                        </Form.Group>
                                        <Form.Group>
                                            {prevlocation !== `/answeredQuestion/${question.id}` ?
                                                <Button block type='submit'>Submit</Button> : 
                                                <Button block variant='warning' type='button' onClick={this.handleUpdate}>Update</Button>
                                            }
                                            <Button block variant='danger' type='button' disabled={disabled} onClick={this.handelDelete}>Delete Question</Button>
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