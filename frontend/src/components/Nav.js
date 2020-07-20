import React,{ Component } from "react"
import { withRouter } from "react-router-dom"
import { Nav} from "react-bootstrap";
import { connect } from "react-redux";
import { logoutAuthedUser } from "../actions/authedUser";
import { withAuth0 } from "@auth0/auth0-react";
import { LogoutButton } from "../auth/Auth";

class Navs extends Component {

    handleSelect = (e) => {        
        this.props.history.push(e)
    }

    handleSubmit = (e) => {
        this.props.dispatch(logoutAuthedUser(this.props.authedUser))
    }

    render() {
        const pathName = this.props.history.location.pathname
        const user = this.props.user
        return (user ?
            <div className='divNav'>
                <Nav activeKey="/home" onSelect={this.handleSelect}>
                    <Nav.Item>
                        <Nav.Link eventKey='/home' className={pathName === '/home' && 'navLink'}>Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey='/leadreboard' className={pathName === '/leadreboard' && 'navLink'}>Leader Board</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey='/newquestion' className={pathName === '/newquestion' && 'navLink'}>New Question</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className='leftNav'>
                        <span>Hello, {user.name}  
                        <img className='imgHeader' src={user.avatarURL} alt='UserAvatar'/>
                        <LogoutButton /> 
                        </span>  
                    </Nav.Item>
                </Nav>    
            </div> : null
        )
    }
}

function mapStateToProps({ users, authedUser }) {
    const user = users[authedUser]
    return {
        authedUser,
        user
    }
}

export default withAuth0(withRouter(connect(mapStateToProps)(Navs)))