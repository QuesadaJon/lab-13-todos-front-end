import React, { Component } from 'react'
import {
    BrowserRouter as Router, 
    Route, 
    Switch,
    Link,
} from "react-router-dom";
import './App.css'
import Home from './Home.js'
import Login from './Login.js'
import SignUp from './SignUp.js'

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <ul>
            <Link to="/login"><div>log in</div></Link>
            <Link to="/signup"><div>sign up</div></Link>
          </ul>
          <Switch>
            <Route exact path='/' render={(routerProps) => <Home {...routerProps}/> } />
            <Route exact path='/login' render={(routerProps) => <Login {...routerProps} />} />
            <Route exact path='/signup' render={(routerProps) => <SignUp {...routerProps}/>} />
          </Switch>
        </Router>
      </div>
    )
  }
}