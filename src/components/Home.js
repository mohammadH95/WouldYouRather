import React, { Component } from "react";
import { Tabs, Tab } from "react-bootstrap";
import QuestionList from "./QuestionList";
import Login from "./Login";

class Home extends Component {

    state = {
        keys: 'unanswered'
    }

    render() {
        return (
            <Tabs activeKey={this.state.keys}
                onSelect={keys => this.setState({ keys })}>
                <Tab eventKey="unanswered" title="Unanswered Questions">
                    <QuestionList keys={this.state} />
                </Tab>
                <Tab eventKey="answered" title="Answered Questions">
                    <QuestionList keys={this.state} />
                </Tab>
            </Tabs>
        )
    }
}

export default Home