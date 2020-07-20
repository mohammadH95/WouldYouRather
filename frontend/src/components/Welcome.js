import React,{ Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { withAuth0 } from "@auth0/auth0-react";
import { handleAddUser } from "../actions/shared";
import { Spinner } from "react-bootstrap";

class Test extends Component {
    state = {
        redirect: false
    }

    componentDidMount() {
        this.id = setTimeout(() => this.setState({ redirect: true }), 3000)
    }

    async componentWillUnmount() {
        const { user, getAccessTokenSilently } = this.props.auth0
        if (!this.props.users.hasOwnProperty(user.email)) {
            this.props.dispatch(handleAddUser(user))
        }
        const accesstoken = await getAccessTokenSilently({
            audience: `wouldYouRather`,
          });
        localStorage.setItem('token', accesstoken)
        clearTimeout(this.id)
    }

    render() {
        const { isAuthenticated } = this.props.auth0
        return( isAuthenticated && this.state.redirect ?
            <Redirect to='/home' /> :
            <div>
                <h1>Welcome To</h1>
                <h2>Would You Rather Game</h2>
                <Spinner animation="border" variant="primary" />
            </div>
        )
    }
}

function mapStateToProps({ users }) {
    return {
        users,
    }
}

export default withAuth0(connect(mapStateToProps)(Test))