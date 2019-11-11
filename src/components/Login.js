import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Button, Form } from "react-bootstrap";
import { setAuthedUser } from "../actions/authedUser";

class Login extends Component {

    state = {
        user: ''
    }

    handelChange = (e) => {
        this.setState({
            user: e.target.value
        })
    }

    handelSubmit = (e) => {
        e.preventDefault()

        this.props.dispatch(setAuthedUser(this.state.user))
        
        this.props.history.push('/home')
    }

    render() {
        const {users} = this.props
        return(
            <div className='center'>
                <Card>
                    <Card.Header>Welcome to Would You Rather</Card.Header>
                    <Card.Body>
                        <form onSubmit={this.handelSubmit}>
                            <Form.Group>
                                <img className='img' src='http://s3.amazonaws.com/37assets/svn/765-default-avatar.png' alt='UserAvatar'/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control as='select' onChange={this.handelChange}>
                                    <option>-- Select User --</option>
                                    {Object.keys(users).map((id) => (
                                        <option key={id} value={id}>{users[id].name}</option>
                                    ))}    
                                </Form.Control>
                            </Form.Group>
                            <Button block type='submit' >Login</Button>
                        </form>    
                    </Card.Body>
                </Card>    
            </div>
            
        )
    }
}

function mapStateToProps({ users }) {
    return {
        users,
    }
}

export default connect(mapStateToProps)(Login)