import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch, 
  Route, 
  Redirect
} from 'react-router-dom';
import axios from 'axios';
import Nav from './Nav';
import Signup from './Signup';
import Login from './Login';
import Hidden from './Hidden';

const PrivateRoute = ({ component: Component, auth, ...rest}) => (
  <Route {...rest} render={(props) => {
    return auth ? <Component {...props} /> : <Redirect to="/login" />;
  }}/>
);

class App extends Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: false,
    };
    this.authenticate = this.authenticate.bind(this);
    this.signup = this.signup.bind(this);
  }

  authenticate(username, email, password) {
    if (!email) return;
    axios.post(`/auth/`, {
      username,
      email,
      password,
    })
      .then(({ data }) => {
        if (data === 'success') {
          this.setState({
            isAuthenticated: true,
          });
        }
      })
      .catch(err => console.log(err));
  }
  
  signup(username, email, password) {
    if (!email) return;
    axios.post(`/signup`, {
      username,
      email,
      password,
    })
      .then(({ data }) => {
        console.log(data);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Router>
        <Nav />
        <Switch>
          <Route
            path="/signup"
            render={(props) => <Signup {...props} signup={this.signup}/>}
          />
          <Route 
            path="/login"
            render={(props) => <Login {...props} authenticate={this.authenticate}/>}
          />
          <PrivateRoute path="/hidden" component={Hidden} auth={this.state.isAuthenticated}/>
        </Switch>
      </Router>
    );
  }
}

export default App;