import React, { Component } from 'react';
import { validateEmail, validatePassword } from '../utils/validators';
import PropTypes from 'prop-types';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      validEmail: false,
      validPassword: false,
      submitClicked: false,
    };
    this.handleUsername = this.handleUsername.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.msgMap = {
      email: 'please enter a valid email, like harry@potter.com',
      password: 'passwords must > 6 chars, have a cap, a num, and a special char',
    };
  }

  handleUsername(e) {
    e.preventDefault();
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
      const validEmail = validateEmail(email);
      const validPassword = validatePassword(password);
      if (!validEmail || ! validPassword) {
        return {
          validEmail,
          validPassword,
          submitClicked: true,
        };
      }
      this.props.authenticate(username, email, password);
      return {
        username: '',
        email: '',
        password: '',
        validEmail: false,
        validPassword: false,
        submitClicked: false,
      };
    });
  }

  render() {
    return (
      <div>
        LOGIN
        <div>
          <input
            type="text"
            placeholder="username"
            name="username"
            value={this.state.username}
            onChange={this.handleUsername}
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="email"
            name="email"
            value={this.state.email}
            onChange={this.handleEmail}
          />
        </div>
        {this.state.email && this.state.submitClicked && !this.state.validEmail ? <div>{this.msgMap['email']}</div> : null }
        <div>
          <input
            type="password"
            placeholder="password"
            name="password"
            value={this.state.password}
            onChange={this.handlePassword}
          />
        </div>
        {this.state.password && this.state.submitClicked && !this.state.validPassword ? <div>{this.msgMap['password']}</div> : null }
        <button onClick={this.handleSubmit}>submit</button>
      </div>
    );
  }
}

Login.propTypes = {
  authenticate: PropTypes.func,
};

export default Login;