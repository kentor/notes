import background from '../lib/background';
import React from 'react';

class Login extends React.PureComponent {
  render() {
    const { hue } = background('login');
    const color = `hsl(${hue}, 100%, 87.5%)`;

    return (
      <a
        className="Login"
        onClick={this.props.onRequestLogin}
        style={{ color }}
      >
        Login
      </a>
    );
  }
}

export default Login;
