import React, { Component, Fragment } from 'react'
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoadingBar from "react-redux-loading";
import { handelGetUsers, handelGetQuestions } from "../actions/shared";
import Login from "./Login";
import Home from "./Home";

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handelGetUsers())
        this.props.dispatch(handelGetQuestions())
    }
    render() {
        return(
            <Router>
                <Fragment>
                    <div>
                        <Route path='/' exact component={Login} />    
                        <Route path='/home' component={Home} />
                    </div>
                </Fragment>
            </Router>
        )
    }
}

export default connect()(App)