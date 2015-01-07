import React from 'react';
import UserActions from '../actions/UserActions';

var Login = React.createClass({
  handleClick() {
    UserActions.login();
  },

  render() {
    return <a className="login-button" onClick={this.handleClick}>Login</a>;
  },
});

export default Login;
