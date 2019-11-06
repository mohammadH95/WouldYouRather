import React,{ Component } from "react"
import { withRouter } from "react-router-dom"
import { Nav, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { logoutAuthedUser } from "../actions/authedUser";

class Navs extends Component {

    handleSelect = (e) => {        
        this.props.history.push(e)
    }

    handleClick = (e) => {
        this.props.dispatch(logoutAuthedUser(this.props.authedUser))

        this.props.history.push('/')
    }

    render() {
        return (
            <Nav activeKey="/home" onSelect={this.handleSelect}>
                <Nav.Item>
                    <Nav.Link eventKey='/home'>Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey='/leadreboard'>Leader Board</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey='/newquestion'>New Question</Nav.Link>
                </Nav.Item>
                <Button onClick={this.handleClick}>Logout</Button>
            </Nav>
        )
    }
}

function mapStateToProps({ authedUser }) {
    return {
        authedUser,
    }
}

export default withRouter(connect(mapStateToProps)(Navs))