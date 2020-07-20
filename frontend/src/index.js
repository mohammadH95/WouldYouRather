import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'
import { Auth0Provider } from "@auth0/auth0-react";
import 'bootstrap/dist/css/bootstrap.css';

function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (e) {
    console.log(e);
  }
}

function loadFromLocalStorage(params) {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (e) {
    console.log(e);
    return undefined
  }
}

const persistedState = loadFromLocalStorage()

const store = createStore(reducer, persistedState, middleware)
store.subscribe(() => saveToLocalStorage(store.getState()))

ReactDOM.render(
  <Auth0Provider
    domain='fsndm.auth0.com'
    clientId='uPJwGSAlJU012RZx6imBVNCDJ30o3ui6'
    redirectUri='http://localhost:3000/welcome'
    audience='wouldYouRather'
    useRefreshTokens='true'
  >
    <Provider store={store}>
        <App />
      </Provider>
  </Auth0Provider>,
document.getElementById('root')
)

