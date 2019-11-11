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
        console.log(this.props.history);
        
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

function mapStateToProps({ questions, authedUser }) {
    const unanswered = []
    const answered = []
    Object.keys(questions)
        .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
        .forEach((id) => {
            if (!hasVoted(questions, id, authedUser)) {
                unanswered.push(id)                
            } else {
                answered.push(id)
            }
        })
        
    return {
        authedUser,
        unanswered,
        answered,
    }
}

export default connect(mapStateToProps)(Home)