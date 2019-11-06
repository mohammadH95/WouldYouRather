import React,{ Component } from "react";
import { Card, Button, Form } from "react-bootstrap";
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
            <Card>
                <Card.Header>{author.name} asks:</Card.Header>
                <Card.Body>
                    <form onSubmit={this.handleSubmit}>
                        <Form.Group>
                            <input type='radio' name='answer' value='optionOne' onChange={this.handleChange} />
                            <span>{question.optionOne.text}</span>
                        </Form.Group>
                        <Form.Group>
                            <input type='radio' name='answer' value='optionTwo' onChange={this.handleChange} />
                            <span>{question.optionTwo.text}</span>
                        </Form.Group>
                        <Form.Group>
                            <Button type='submit'>Submit</Button>
                        </Form.Group>
                    </form>
                </Card.Body>
            </Card>
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