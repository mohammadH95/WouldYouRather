import React, { Component } from "react";
import { connect } from "react-redux";
import { Card } from "react-bootstrap";
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
            <Card>
                <Card.Header>Welcome to Would You Rather</Card.Header>
                <form onSubmit={this.handelSubmit}>
                    <div>
                        <select onChange={this.handelChange}>
                            <option>-- Select User --</option>
                            {Object.keys(users).map((id) => (
                                <option key={id} value={id}>{users[id].name}</option>
                            ))}
                        </select>  
                    </div>
                    <button type='submit' >Login</button>
                </form>
            </Card>
            
                
        )
    }
}

function mapStateToProps({ users }) {
    return {
        users,
    }
}

export default connect(mapStateToProps)(Login)