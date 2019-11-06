import React,{ Component } from "react";
import { connect } from "react-redux";
import { Card, Button, Form } from "react-bootstrap";
import { handleAddQuestion } from "../actions/shared";

class NewQuestion extends Component {
    state = {
        optionOne: '',
        optionTwo: '',
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { optionOne, optionTwo } = this.state

        const newquestion = {
            optionOneText: optionOne,
            optionTwoText: optionTwo,
            author: this.props.authedUser
        }
        
        this.props.dispatch(handleAddQuestion(newquestion))

        this.props.history.push('/home')
    }

    handleChange = (e) => {
        e.preventDefault()

        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <Card>
                <Card.Header>Create New Question</Card.Header>
                <Card.Body>
                    <p>Complete the question</p>
                    <h4>Would you rather...</h4>
                    <Form onSubmit={this.handleSubmit} >
                        <Form.Group>
                            <Form.Control 
                                placeholder='Enter Option One'
                                name='optionOne'
                                value={this.state.optionOne}
                                onChange={this.handleChange}
                            />
                            <h6>Or</h6>
                            <Form.Control
                                placeholder='Enter Option Two'
                                name='optionTwo'
                                value={this.state.optionTwo}
                                onChange={this.handleChange}
                            />
                            <Button type='submit'>Submit</Button>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        )
    }
}

function mapStateToProps({ authedUser }) {
    return {
        authedUser,
    }
}

export default connect(mapStateToProps)(NewQuestion)