var React = require('react');
var Appconfig = require('../appconfig');

var Login = React.createClass({
  handleClick: function() {
    Appconfig.firebaseRef.authWithOAuthRedirect('twitter', function() {});
  },

  render: function() {
    return <a className="login-button" onClick={this.handleClick}>Login</a>;
  },
});

module.exports = Login;
