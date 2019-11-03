import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Button } from "react-bootstrap";

class QuestionList extends Component {
    

    render() {
        const { question, author } = this.props

        
        return(
            <Card>
                <Card.Header>{author.name}</Card.Header>
                <p>Would you rather</p>
                <p>{question.optionOne.text}</p>
                <Button>View Poll</Button>
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

export default connect(mapStateToProps)(QuestionList)