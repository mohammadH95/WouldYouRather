import React,{ Component } from "react";
import { connect } from "react-redux";
import { Card } from "react-bootstrap";
import { score } from "../utils/helper";

class UserScore extends Component {
    render() {
        const { name, answeredQ, createdQ, userscore } = this.props
        return (
            <Card>
                <Card.Header>{name}</Card.Header>
                <Card.Body>
                    <p>score: {userscore}</p>
                    <p>answeredQ: {answeredQ}</p>
                    <p>createdQ: {createdQ}</p>
                </Card.Body>
            </Card>
        )
    }
}

function mapStateToProps({ users, authedUser }, {id}) {
    const name = users[id].name
    const answeredQ = Object.keys(users[id].answers).length
    const createdQ = users[id].questions.length    
    const userscore = score(users[id])
    
    return {
        name,
        answeredQ,
        createdQ,
        userscore
    }
}

export default connect(mapStateToProps)(UserScore)