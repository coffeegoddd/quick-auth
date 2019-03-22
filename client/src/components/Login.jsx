import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      redirectToReferrer: false,
    };
    this.handleUsername = this.handleUsername.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsername(e) {
    const username = e.target.value;
    this.setState({
      username,
    });
  }

  handleEmail(e) {
    const email = e.target.value;
    this.setState({
      email,
    });
  }

  handlePassword(e) {
    const password = e.target.value;
    this.setState({
      password,
    });
  }

  handleSubmit() {
    this.setState((state) => {
      const { username, email, password } = state;
      this.props.authenticate(username, email, password);
      return {
        username: '',
        email: '',
        password: '',
      };
    });
  }

  render() {
    const { redirectToReferrer } = this.state;
    if (redirectToReferrer) return <Redirect to="/" />;
    return (
      <div>
        LOGIN
        <form>
          <input
            type="text"
            placeholder="username"
            name="username"
            value={this.state.username}
            onChange={this.handleUsername}
          />
        </form>
        <form>
          <input
            type="email"
            placeholder="email"
            name="email"
            value={this.state.email}
            onChange={this.handleEmail}
          />
        </form>
        <form>
          <input
            type="password"
            placeholder="password"
            name="password"
            value={this.state.password}
            onChange={this.handlePassword}
          />
        </form>
        <button onClick={this.handleSubmit}>submit</button>
      </div>
    );
  }
}

export default Login;