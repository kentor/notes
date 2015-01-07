import Appconfig from '../appconfig';
import React from 'react';

var Login = React.createClass({
  handleClick() {
    Appconfig.firebaseRef.authWithOAuthRedirect('twitter', () => {});
  },

  render() {
    return <a className="login-button" onClick={this.handleClick}>Login</a>;
  },
});

export default Login;
