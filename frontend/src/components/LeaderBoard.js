import React,{ Component } from "react"
import { connect } from "react-redux";
import { score } from "../utils/helper";
import UserScore from "./UserScore";

class LeaderBoard extends Component {
    render() {
        const { userOrdered } = this.props
        return (
            <div className='center'>
                { userOrdered.map((id) => <UserScore key={id} id={id} />) }
            </div>
        )
    }
}

function mapStateToProps({ users, authedUser, questions, answers }) {
    const userList = Object.keys(users)
    
    const userOrdered = userList.sort((a, b) => score(users[b], questions, answers) - score(users[a], questions, answers))
    

    return {
        userOrdered,
        authedUser
    }
}

export default connect(mapStateToProps)(LeaderBoard)