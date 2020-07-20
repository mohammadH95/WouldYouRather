import React, { Component } from "react";
import { connect } from "react-redux";
import { Tabs, Tab } from "react-bootstrap";
import QuestionsList from "./QuestionsList";
import { hasVoted } from "../utils/helper";
import { withAuth0, } from "@auth0/auth0-react";
import { setAuthedUser } from "../actions/authedUser";

class Home extends Component {
    state = {
        activeTab: 'unanswered'
    }

    handleSelect(selectedTab) {
        this.setState({activeTab: selectedTab})
    }

    async componentDidMount() {
        const { user } = this.props.auth0
        const authedUser = this.props.authedUser
        if (!authedUser) {
            this.props.dispatch(setAuthedUser(user.email))
        }
    }

    render() {
        
        return (
            
            <Tabs className='taps' activeKey={this.state.activeTab}
                onSelect={k => this.handleSelect(k)}>
                <Tab eventKey='unanswered' title="Unanswered Questions">
                    {this.props.unanswered.map(id => <QuestionsList key={id} id={id} check={1}/>)}
                </Tab>
                <Tab eventKey='answered' title="Answered Questions">
                    {this.props.answered.map(id => <QuestionsList key={id} id={id} check={2}/>)}
                </Tab>
            </Tabs>
        )
    }
}

function mapStateToProps({ answers, questions, authedUser, users }) {
    const unanswered = []
    const answered = []
    Object.keys(questions)
        .forEach((id) => {
            if (!hasVoted(answers, id, authedUser)) {
                unanswered.push(id)                
            } else {
                answered.push(id)
            }
        })
        
    return {
        authedUser,
        unanswered,
        answered,
        users,
    }
}

export default withAuth0(connect(mapStateToProps)(Home))