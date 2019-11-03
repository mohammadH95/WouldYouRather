import React, { Component } from "react";
import { connect } from "react-redux";
import { Tabs, Tab } from "react-bootstrap";
import QuestionsList from "./QuestionsList";
import { hasVoted } from "../utils/helper";

class Home extends Component {
    state = {
        activeTab: 'unanswered'
    }

    handleSelect(selectedTab) {
        this.setState({activeTab: selectedTab})
    }

    render() {
        console.log('unanswered: ' , this.props.unanswered);
        console.log('answered: ' , this.props.answered);

        return (
            <Tabs activeKey={this.state.activeTab}
                onSelect={k => this.handleSelect(k)}>
                <Tab eventKey='unanswered' title="Unanswered Questions">
                    Unanswered Questions
                    {this.props.unanswered.map(id => <QuestionsList key={id} id={id} />)}
                </Tab>
                <Tab eventKey='answered' title="Answered Questions">
                    Answered Questions
                    {this.props.answered.map(id => <QuestionsList key={id} id={id} />)}
                </Tab>
            </Tabs>
        )
    }
}

function mapStateToProps({ questions, authedUser }) {
    const unanswered = []
    const answered = []
    Object.keys(questions)
        .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
        .forEach((id) => {
            console.log('id: ',id);
            
            if (!hasVoted(questions, id, authedUser)) {
                console.log('id 1: ',id);
                unanswered.push(id)                
            } else {
                console.log('id 2: ',id);
                answered.push(id)
            }
        })
        
    return {
        unanswered,
        answered,
    }
}

export default connect(mapStateToProps)(Home)