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
        const pathName = this.props.history.location.pathname
        return (
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
                        <span>Hello, {this.props.name}  
                        <img className='imgHeader' src={this.props.avatar} alt='UserAvatar'/>  
                        <Button className='justify-content-end' variant="outline-danger" onClick={this.handleClick}>Logout</Button>  
                        </span>  
                    </Nav.Item>
                    
                </Nav>    
            </div>
        )
    }
}

function mapStateToProps({ users, authedUser }) {
    const name = users[authedUser].name
    const avatar = users[authedUser].avatarURL
    return {
        authedUser,
        name,
        avatar
    }
}

export default withRouter(connect(mapStateToProps)(Navs))