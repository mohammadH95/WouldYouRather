import React, { Component, Fragment } from 'react'
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoadingBar from "react-redux-loading";
import { handleInitialData } from "../actions/shared";
import Login from "./Login";
import Home from "./Home";
import UnansweredQuestion from "./UnansweredQuestion";
import AnsweredQuestion from "./AnsweredQuestion";
import LeaderBoard from "./LeaderBoard";
import Nav from "./Nav";
import Welcome from "./Welcome";
import NewQuestion from "./NewQuestion";
import ErrorPage from "./ErrorPage";
import { withAuth0 } from "@auth0/auth0-react";

class App extends Component {
    componentDidMount() {
        if (localStorage.getItem('state') === null) {
            this.props.dispatch(handleInitialData())
        }
    }
    render() {
        const { authedUser } = this.props
        return(
            <Router>
                <Fragment>
                    <LoadingBar />
                    {authedUser === null ? (null) : <Nav /> }
                    <div className='center'>
                        <Switch>
                            <Route exact path='/' component={Login} />    
                            <Route exact path='/home' component={Home} />
                            <Route exact path='/unansweredQuestion/:id' component={UnansweredQuestion} />
                            <Route exact path='/answeredQuestion/:id' component={AnsweredQuestion} />
                            <Route exact path='/leadreboard' component={LeaderBoard} />
                            <Route exact path='/newquestion' component={NewQuestion} />
                            <Route exact path='/welcome' component={Welcome} />
                            <Route component={ErrorPage} />    
                        </Switch>
                        
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

export default withAuth0(connect(mapStateToProps)(App))