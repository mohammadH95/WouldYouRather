import React,{ Component } from "react";
import { connect } from "react-redux";
import { Card, Container, Row, Col, Image, Button } from "react-bootstrap";
import { score, getAnsweredQ, getCreatedQ } from "../utils/helper";
import { handleDeleteUser } from "../actions/shared";
import jwt from 'jwt-decode'

class UserScore extends Component {
    state = {
        disabled: true
    }

    componentDidMount() {
        const jwt_decoded = jwt(localStorage.getItem('token'))
        if (jwt_decoded.permissions.includes('delete:users')) {
            this.setState({ disabled: false })
        }
    }

    handleClick = (e) => {
        e.preventDefault()
        const userId = this.props.user.id
        const questions = this.props.questions
        const userQs = []
        Object.keys(questions).forEach((key) => {if (questions[key].author === userId) {userQs.push(key)}})
        const token = localStorage.getItem('token')
        this.props.dispatch(handleDeleteUser(token, userId, userQs))
    }

    render() {
        const { name, avatar, answeredQ, createdQ, userscore } = this.props
        const disabled = this.state.disabled
        return (
            <Card>
                <Card.Body>
                    <Container>
                        <Row>
                            <Col className='colImg' xs={3}>
                                <Image className='img' src={avatar} alt='UserAvatar'/>
                                <Button variant='danger' disabled={disabled} onClick={this.handleClick}>Delete User</Button>
                            </Col>
                            <Col className='colImg'>
                                <Row>
                                    <Col className='colScore'><h2>{name}</h2></Col>
                                </Row>
                                <Row>
                                    <Col className='colScore'>Answered questions:</Col>
                                    <Col xs={3}>{answeredQ}</Col>
                                </Row>
                                <Row>
                                    <Col className='colScore'>Created questions:</Col>
                                    <Col xs={3}>{createdQ}</Col>
                                </Row>         
                            </Col>
                            <Col>
                                <Card>
                                    <Card.Header>Score</Card.Header>
                                    <Card.Body>
                                        <div className='divLead'>{userscore}</div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>                    
                </Card.Body>
            </Card>
        )
    }
}

function mapStateToProps({ users, authedUser, questions, answers }, {id}) {
    const user = users[id]
    const name = users[id].name
    const avatar = users[id].avatarURL
    const answeredQ = getAnsweredQ(users[id], answers)
    const createdQ = getCreatedQ(users[id], questions)   
    const userscore = score(users[id], questions, answers)
    
    return {
        user,
        name,
        avatar,
        answeredQ,
        createdQ,
        userscore,
        questions
    }
}

export default connect(mapStateToProps)(UserScore)