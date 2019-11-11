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
import NewQuestion from "./NewQuestion";
import ErrorPage from "./ErrorPage";

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
                    <div className='center'>
                        <Switch>
                            <Route exact path='/' component={Login} />    
                            <Route exact path='/home' component={Home} />
                            <Route exact path='/unansweredQuestion/:id' component={UnansweredQuestion} />
                            <Route exact path='/answeredQuestion/:id' component={AnsweredQuestion} />
                            <Route exact path='/leadreboard' component={LeaderBoard} />
                            <Route exact path='/newquestion' component={NewQuestion} />
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

export default connect(mapStateToProps)(App)