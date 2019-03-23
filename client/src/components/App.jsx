import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Switch, 
  Route, 
  Redirect
} from 'react-router-dom';
import { withCookies } from 'react-cookie';
import axios from 'axios';
import Nav from './Nav';
import Signup from './Signup';
import Login from './Login';
import Hidden from './Hidden';
import Logout from './Logout';

const PrivateRoute = ({ component: Component, auth, ...rest}) => (
  <Route {...rest} render={(props) => {
    return auth ? <Component {...props} /> : <Redirect to="/login" />;
  }}/>
);

class App extends Component {
  constructor(props) {
    super(props);
    const { coffee } = this.props.cookies.cookies
    this.state = {
      isAuthenticated: false,
      sessionId: coffee,
      restricted: '',
    };
    this.authenticate = this.authenticate.bind(this);
    this.signup = this.signup.bind(this);
    this.isSessionValid = this.isSessionValid.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    this.isSessionValid();
  }

  authenticate(username, email, password) {
    if (!email || !username) return;
    axios.post(`/auth/`, {
      username,
      email,
      password,
    })
      .then(({ data }) => {
        const { msg, sessionId } = data;
        if (msg === 'success') {
          this.setState({
            isAuthenticated: true,
            sessionId,
            restricted: '',
          });
        } else {
          this.setState({
            sessionId,
          });
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({
          restricted: 'No account exists, please go to signup',
        });
      });
  }
  
  signup(username, email, password) {
    if (!email || !username) return;
    axios.post(`/signup`, {
      username,
      email,
      password,
    })
      .then(({ data }) => {
        const { sessionId } = data;
        this.setState({
          isAuthenticated: true,
          sessionId,
          restricted: '',
        });
      })
      .catch(err => console.log(err));
  }

  isSessionValid() {
    const { sessionId } = this.state;
    axios.post(`/validate`, {
      sessionId,
    })
      .then(({ data }) => {
        if (data === 'success') {
          this.setState({
            isAuthenticated: true,
          });
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({
          sessionId: '',
        });
      });
  }

  handleLogout() {
    const { sessionId } = this.state;
    axios.delete(`/logout`, { data: { sessionId, } })
      .then(() => {
        this.setState({
          isAuthenticated: false,
          restricted: '',
          sessionId: 'l0GoUt',
        });
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
          <PrivateRoute
            path="/hidden"
            component={Hidden}
            auth={this.state.isAuthenticated}
          />
        </Switch>
        {this.state.isAuthenticated ? <Logout logout={this.handleLogout}/> : null}
        {this.state.restricted ? this.state.restricted : null }
      </Router>
    );
  }
}

App.propTypes = {
  cookies: PropTypes.object,
};

export default withCookies(App);