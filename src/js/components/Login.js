import API from '../api';
import background from '../lib/background';
import React from 'react';

class Login extends React.PureComponent {
  state = {
    error: '',
    password: '',
    username: '',
  };

  handleLogin = e => {
    e.preventDefault();
    API.login(this.state.username, this.state.password).catch(error => {
      this.setState({ error: error.message });
    });
  };

  handleChange = e => {
    this.setState({ [e.target.getAttribute('name')]: e.target.value });
  };

  render() {
    const { hue } = background('login');
    const color = `hsl(${hue}, 100%, 87.5%)`;

    return (
      <form
        onSubmit={this.handleLogin}
        style={{
          alignItems: 'center',
          color,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '2rem',
        }}
      >
        <div>{this.state.error}</div>
        <input
          name="username"
          onChange={this.handleChange}
          placeholder="username"
          style={{ margin: '.5rem 0' }}
          value={this.state.username}
        />
        <input
          name="password"
          onChange={this.handleChange}
          placeholder="password"
          style={{ margin: '.5rem 0' }}
          type="password"
          value={this.state.password}
        />
        <button
          style={{
            background: 'transparent',
            border: 0,
            color,
            margin: '.5rem 0',
          }}
          type="submit"
        >
          Login
        </button>
      </form>
    );
  }
}

export default Login;
