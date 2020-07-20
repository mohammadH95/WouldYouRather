import React, { Component } from "react";
import { connect } from "react-redux";
import { Card } from "react-bootstrap";
import { LoginButton} from "../auth/Auth";
import { withAuth0 } from "@auth0/auth0-react";
import { logoutAuthedUser } from "../actions/authedUser";
import wouldUrather from "../utils/wouldUrather.jpg";

class Login extends Component {
    componentDidMount() {
        const authedUser = this.props.authedUser
        if (authedUser) {
            this.props.dispatch(logoutAuthedUser(authedUser))
        }

    }
    render() {
        return( 
            <div className='center'>
                <Card>
                    <Card.Img src={wouldUrather} />
                    <Card.Body>
                        <LoginButton/>
                    </Card.Body>
                </Card>    
            </div>
        )
    }
}

function mapStateToProps({ users, authedUser }) {
    return {
        users,
        authedUser
    }
}

export default withAuth0(connect(mapStateToProps)(Login))