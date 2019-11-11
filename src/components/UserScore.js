import React,{ Component } from "react";
import { connect } from "react-redux";
import { Card, Container, Row, Col, Image } from "react-bootstrap";
import { score } from "../utils/helper";

class UserScore extends Component {
    render() {
        const { name, avatar, answeredQ, createdQ, userscore } = this.props
        return (
            <Card>
                <Card.Body>
                    <Container>
                        <Row>
                            <Col className='colImg' xs={3}>
                                <Image className='img' src={avatar} alt='UserAvatar'/>
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

function mapStateToProps({ users, authedUser }, {id}) {
    const name = users[id].name
    const avatar = users[id].avatarURL
    const answeredQ = Object.keys(users[id].answers).length
    const createdQ = users[id].questions.length    
    const userscore = score(users[id])
    
    return {
        name,
        avatar,
        answeredQ,
        createdQ,
        userscore
    }
}

export default connect(mapStateToProps)(UserScore)