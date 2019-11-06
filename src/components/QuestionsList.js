import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";

class QuestionList extends Component {
    
    handleClick = (e, id) => {
        e.preventDefault()

        if (this.props.check === 1) {
            this.props.history.push(`/unansweredQuestion/${id}`)
        } 
        else if (this.props.check === 2) {
            this.props.history.push(`/answeredQuestion/${id}`)
        }
    }

    render() {
        const { question, author } = this.props        
        
        return(
            <Card>
                <Card.Header>{author.name}</Card.Header>
                <p>Would you rather</p>
                <p>{question.optionOne.text}</p>
                <Button onClick={(e) => this.handleClick(e, question.id)}>View Poll</Button>
            </Card>
        )
    }
}

function mapStateToProps({ questions, users }, { id }) {
    const question = questions[id]
    const author = users[question.author]

    return {
        question,
        author
    }
}

export default withRouter(connect(mapStateToProps)(QuestionList))