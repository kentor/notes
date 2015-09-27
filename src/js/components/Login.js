import background from '../lib/background';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';

const Login = React.createClass({
  mixins: [
    PureRenderMixin,
  ],

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
  },
});

export default Login;
