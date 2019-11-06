import React, { Component, Fragment } from 'react'
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoadingBar from "react-redux-loading";
import { handleInitialData } from "../actions/shared";
import Login from "./Login";
import Home from "./Home";
import UnansweredQuestion from "./UnansweredQuestion";
import AnsweredQuestion from "./AnsweredQuestion";
import LeaderBoard from "./LeaderBoard";
import Nav from "./Nav";
import NewQuestion from "./NewQuestion";

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }
    render() {
        const { authedUser } = this.props
        return(
            <Router>
                <Fragment>
                    <LoadingBar />
                    {authedUser === null ? (null) : <Nav /> }
                    <div>
                        <Route path='/' exact component={Login} />    
                        <Route path='/home' component={Home} />
                        <Route path='/unansweredQuestion/:id' component={UnansweredQuestion} />
                        <Route path='/answeredQuestion/:id' component={AnsweredQuestion} />
                        <Route path='/leadreboard' component={LeaderBoard} />
                        <Route path='/newquestion' component={NewQuestion} />
                    </div>
                </Fragment>
            </Router>
        )
    }
}

function mapStateToProps({ authedUser }) {
    return {
        authedUser,
    }
}

export default connect(mapStateToProps)(App)