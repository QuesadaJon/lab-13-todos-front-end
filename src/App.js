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
import Todos from './Todos.js'

export default class App extends Component {
  state = {
    username: '',
    token: '',
  }

  usernameTokenCallback = (username, token) => {
    localStorage.setItem('TOKEN', token);
    localStorage.setItem('USERNAME', username);
    this.setState({
      username: username,
      token: token,
    })
  }

  render() {
    return (
      <div>
        <Router>
          <ul>
            { localStorage.getItem('USERNAME') }
            <Link to="/login"><div>log in</div></Link>
            <Link to="/signup"><div>sign up</div></Link>
          </ul>
          <Switch>
            <Route exact path='/' render={(routerProps) => <Home {...routerProps}/> } />
            <Route exact path='/login' render={(routerProps) => <Login {...routerProps} />} />
            <Route
             exact 
             path='/signup' 
             render={(routerProps) => 
                <SignUp 
                {...routerProps}
                usernameTokenCallback={this.usernameTokenCallback} 
              />}
            />
            <Route exact path='/todos' render={(routerProps) => <Todos {...routerProps} />} />
          </Switch>
        </Router>
      </div>
    )
  }
}