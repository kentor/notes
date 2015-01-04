var Appconfig = require('../appconfig');
var React = require('react');

var Login = React.createClass({
  handleClick() {
    Appconfig.firebaseRef.authWithOAuthRedirect('twitter', function() {});
  },

  render() {
    return <a className="login-button" onClick={this.handleClick}>Login</a>;
  },
});

module.exports = Login;
