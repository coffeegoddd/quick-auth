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
      validUsername: false,
    };
    this.handleUsername = this.handleUsername.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.checkEmail = this.checkEmail.bind(this);
    this.checkUsername = this.checkUsername.bind(this);

    this.msgMap = {
      email: 'please enter a valid email, like harry@potter.com',
      password: `pw must have minimum of > 8 chars, one uppercase letter, one lower
      case, one number, one special char`,
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
    if (this.state.validUsername && this.state.validEmail && this.state.validPassword) {
      const { username, email, password } = this.state;
      this.props.authenticate(username, email, password);
      this.setState({
        username: '',
        email: '',
        password: '',
        validEmail: false,
        validPassword: false,
      });
    }
  return;
}

  checkPassword(e) {
    // Minimum eight characters, at least one uppercase letter, 
    // one lowercase letter, one number and one special character:
    const { value } = e.target;
    const validPassword = validatePassword(value);
    this.setState({ validPassword });
  }

  checkEmail(e) {
    const { value } = e.target;
    const validEmail = validateEmail(value);
    this.setState({ validEmail });
  }

  checkUsername(e) {
    if (e.target.value) return this.setState({ validUsername: true })
    this.setState({ validUsername: false });
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
            onBlur={(e) => this.checkUsername(e)}
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="email"
            name="email"
            value={this.state.email}
            onChange={this.handleEmail}
            onBlur={(e) => this.checkEmail(e)}
          />
        </div>
        {this.state.email && !this.state.validEmail ? <div>{this.msgMap['email']}</div> : null }
        <div>
          <input
            type="password"
            placeholder="password"
            name="password"
            value={this.state.password}
            onChange={this.handlePassword}
            onBlur={(e) => this.checkPassword(e)}
          />
        </div>
        {this.state.password && !this.state.validPassword ? <div>{this.msgMap['password']}</div> : null }
        <button onClick={this.handleSubmit}>submit</button>
      </div>
    );
  }
}

Login.propTypes = {
  authenticate: PropTypes.func,
};

export default Login;